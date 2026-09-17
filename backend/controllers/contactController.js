const ContactMessage = require("../models/ContactMessage");
const Profile = require("../models/Profile");
const { sendMail } = require("../config/mailer");

// POST /api/contact
const createMessage = async (req, res, next) => {
  try {
    const { name, phone, email, category, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: "Name, phone and message are required" });
    }
    const doc = await ContactMessage.create({ name, phone, email, category: category || undefined, message });
    res.status(201).json({ success: true, message: "Message sent, we'll get back to you soon", data: doc });

    // notify the vendor — fire-and-forget, never blocks or fails the response above
    const profile = await Profile.findOne();
    const notifyTo = process.env.NOTIFY_EMAIL || profile?.email;
    if (notifyTo) {
      sendMail({
        to: notifyTo,
        subject: `New enquiry from ${name}`,
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email || "-"}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Email:</strong> ${email || "-"}</p><p>${message}</p>`,
      });
    }
  } catch (err) {
    next(err);
  }
};

// GET /api/contact (admin)
const getMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().populate("category", "name").sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/contact/:id/read (admin)
const markRead = async (req, res, next) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!msg) return res.status(404).json({ success: false, message: "Message not found" });
    res.json({ success: true, message: msg });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/contact/:id (admin)
const deleteMessage = async (req, res, next) => {
  try {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: "Message not found" });
    res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createMessage, getMessages, markRead, deleteMessage };
