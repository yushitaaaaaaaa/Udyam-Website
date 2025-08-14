import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Try inserting a record
  const newEntry = await prisma.udyamFormData.create({
    data: {
      aadhaar_no: "123456789012",
      entrepreneur_name: "Test User",
      otp: "123456",
      org_type: "Proprietorship",
      pan_number: "ABCDE1234F",
      pan_holder_name: "Test PAN Holder",
      dob: new Date("1995-08-13")
    }
  });

  console.log("Inserted:", newEntry);
}

main()
  .catch(e => console.error("Error:", e))
  .finally(() => prisma.$disconnect());