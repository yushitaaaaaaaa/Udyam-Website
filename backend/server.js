import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// POST /api/submit
app.post('/api/submit', async (req, res) => {
  try {
    const { aadhaar_no, entrepreneur_name, otp, org_type, pan_number, pan_holder_name, dob } = req.body;

    // ✅ Basic validations
    if (!aadhaar_no || !/^\d{12}$/.test(aadhaar_no)) {
      return res.status(400).json({ error: 'Invalid Aadhaar number. Must be 12 digits.' });
    }
    if (!otp || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({ error: 'Invalid OTP. Must be 6 digits.' });
    }
    if (!pan_number || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan_number)) {
      return res.status(400).json({ error: 'Invalid PAN format.' });
    }

    // ✅ Insert into DB
    const formData = await prisma.udyamFormData.create({
      data: {
        aadhaar_no,
        entrepreneur_name,
        otp,
        org_type,
        pan_number,
        pan_holder_name,
        dob: new Date(dob),
      },
    });

    res.status(201).json(formData);
  } catch (error) {
    if (error.code === 'P2002') {
      // Unique constraint violation
      return res.status(409).json({ error: 'Aadhaar or PAN already exists.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/submissions
app.get('/api/submissions', async (req, res) => {
  try {
    const data = await prisma.udyamFormData.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Mock storage for OTPs (in-memory)
const otpStore = {};

// 1. Send OTP (mock)
app.post('/api/send-otp', (req, res) => {
  const { aadhaar_no, entrepreneur_name } = req.body;

  if (!aadhaar_no || aadhaar_no.length !== 12) {
    return res.status(400).json({ error: 'Invalid Aadhaar number' });
  }
  if (!entrepreneur_name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  otpStore[aadhaar_no] = otp;

  console.log(`Generated OTP for ${aadhaar_no}: ${otp}`); // For debugging

  res.json({ message: `OTP sent successfully! Your OTP is ${otp}`, otp }); // ✅ include OTP
});

// 2. Verify OTP
app.post('/api/verify-otp', (req, res) => {
  const { aadhaar_no, otp } = req.body;

  if (!otpStore[aadhaar_no]) {
    return res.status(400).json({ error: 'OTP not generated for this Aadhaar' });
  }

  if (otpStore[aadhaar_no] !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  delete otpStore[aadhaar_no]; // Remove OTP after successful verification
  res.json({ message: 'OTP verified successfully' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));