import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const C = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  dim: "\x1b[2m",
};

function info(msg: string) {
  console.log(`${C.cyan}➜${C.reset} ${msg}`);
}
function success(msg: string) {
  console.log(`  ${C.green}✓${C.reset} ${msg}`);
}
function warn(msg: string) {
  console.log(`  ${C.yellow}⚠${C.reset} ${msg}`);
}
function section(title: string) {
  console.log(`\n${C.magenta}━━━ ${title} ${C.reset}${C.magenta}${"━".repeat(Math.max(0, 50 - title.length - 4))}${C.reset}`);
}
function detail(label: string, value: string) {
  console.log(`  ${C.dim}${label}:${C.reset} ${value}`);
}

async function main() {
  console.log(`\n${C.cyan}${"╭".repeat(52)}${C.reset}`);
  console.log(`${C.cyan}│${C.reset}  ${C.bold || ""}🌱  GHOROA Database Seed${C.reset}${" ".repeat(31)}${C.cyan}│${C.reset}`);
  console.log(`${C.cyan}╰${"─".repeat(51)}${C.reset}\n`);

  // ── Clean ──
  section("Cleaning existing data");
  info("Removing existing records...");
  await prisma.rentTransaction.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.flat.deleteMany();
  await prisma.electricMeter.deleteMany();
  await prisma.gasMeter.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verification.deleteMany();
  await prisma.user.deleteMany();
  success("All existing data removed.");

  // ── Password hash ──
  section("Preparing credentials");
  const passwordHash = await bcrypt.hash("password123", 10);
  success("Password hash generated (password123)");

  // ── Flats (A1–F3, 6 floors × 3 flats each) ──
  section("Creating flats with electric & gas meters");

  const flatConfigs = [
    // Floor 1
    { code: "A1", floor: 1 }, { code: "A2", floor: 1 }, { code: "A3", floor: 1 },
    // Floor 2
    { code: "B1", floor: 2 }, { code: "B2", floor: 2 }, { code: "B3", floor: 2 },
    // Floor 3
    { code: "C1", floor: 3 }, { code: "C2", floor: 3 }, { code: "C3", floor: 3 },
    // Floor 4
    { code: "D1", floor: 4 }, { code: "D2", floor: 4 }, { code: "D3", floor: 4 },
    // Floor 5
    { code: "E1", floor: 5 }, { code: "E2", floor: 5 }, { code: "E3", floor: 5 },
    // Floor 6
    { code: "F1", floor: 6 }, { code: "F2", floor: 6 }, { code: "F3", floor: 6 },
  ];

  const flatMap: Record<string, string> = {}; // code -> flat id

  for (let i = 0; i < flatConfigs.length; i++) {
    const fc = flatConfigs[i];

    const electricMeter = await prisma.electricMeter.create({
      data: {
        name: `Electric Meter - ${fc.code}`,
        meterNo: BigInt(1000 + i),
      },
    });

    const gasMeter = await prisma.gasMeter.create({
      data: {
        name: `Gas Meter - ${fc.code}`,
        meterNo: BigInt(2000 + i),
      },
    });

    const flat = await prisma.flat.create({
      data: {
        name: `Flat ${fc.code}`,
        code: fc.code,
        floor: fc.floor,
        electricMeterId: electricMeter.id,
        gasMeterId: gasMeter.id,
      },
    });

    flatMap[fc.code] = flat.id;
    success(`Flat ${fc.code} (Floor ${fc.floor}) — electric & gas meters created`);
  }

  // ── Admin users ──
  section("Creating admin users");

  info("Creating Super Admin...");
  const superAdmin = await prisma.user.create({
    data: {
      name: "Mizanur Rahman",
      email: "superadmin@ghoroa.com",
      emailVerified: true,
      phone: "+8801711111111",
      nid: "1987654321",
      nidProof: "uploads/nid/superadmin-mizanur.jpg",
      userType: "SUPER_ADMIN",
    },
  });
  await prisma.account.create({
    data: {
      userId: superAdmin.id,
      accountId: superAdmin.email,
      providerId: "credential",
      password: passwordHash,
    },
  });
  success("Super Admin created");
  detail("Name", "Mizanur Rahman");
  detail("Email", "superadmin@ghoroa.com");

  info("Creating Admin...");
  const admin = await prisma.user.create({
    data: {
      name: "Kamal Hossain",
      email: "admin@ghoroa.com",
      emailVerified: true,
      phone: "+8801711111112",
      nid: "1987654322",
      nidProof: "uploads/nid/admin-kamal.jpg",
      userType: "ADMIN",
    },
  });
  await prisma.account.create({
    data: {
      userId: admin.id,
      accountId: admin.email,
      providerId: "credential",
      password: passwordHash,
    },
  });
  success("Admin created");
  detail("Name", "Kamal Hossain");
  detail("Email", "admin@ghoroa.com");

  // ── Tenants ──
  section("Creating tenants");

  const tenantData = [
    { name: "Shahidul Islam", email: "shahidul@ghoroa.com", phone: "+8801711111113", nid: "1987654323", flatCode: "A1", rent: 10000, headCount: 4, utilities: 1500, advance: 30000 },
    { name: "Rafiq Uddin", email: "rafiq@ghoroa.com", phone: "+8801711111114", nid: "1987654324", flatCode: "A2", rent: 12000, headCount: 3, utilities: 1200, advance: 36000 },
    { name: "Abul Hashem", email: "abul@ghoroa.com", phone: "+8801711111115", nid: "1987654325", flatCode: "B1", rent: 8000, headCount: 2, utilities: 1000 },
    { name: "Jahangir Alam", email: "jahangir@ghoroa.com", phone: "+8801711111116", nid: "1987654326", flatCode: "B3", rent: 15000, headCount: 5, utilities: 2000, advance: 50000 },
    { name: "Mostafa Kamal", email: "mostafa@ghoroa.com", phone: "+8801711111117", nid: "1987654327", flatCode: "C2", rent: 11000, headCount: 3, utilities: 1300, advance: 25000 },
    { name: "Abdul Karim", email: "abdul@ghoroa.com", phone: "+8801711111118", nid: "1987654328", flatCode: "C3", rent: 9500, headCount: 4, utilities: 1100 },
    { name: "Shamsul Haque", email: "shamsul@ghoroa.com", phone: "+8801711111119", nid: "1987654329", flatCode: "D1", rent: 13000, headCount: 6, utilities: 1800, advance: 40000 },
    { name: "Nurul Islam", email: "nurul@ghoroa.com", phone: "+8801711111120", nid: "1987654330", flatCode: "D2", rent: 14000, headCount: 4, utilities: 1600, advance: 45000 },
    { name: "Fatima Begum", email: "fatima@ghoroa.com", phone: "+8801711111121", nid: "1987654331", flatCode: "E1", rent: 8500, headCount: 3, utilities: 1000, advance: 20000 },
    { name: "Hasina Akhter", email: "hasina@ghoroa.com", phone: "+8801711111122", nid: "1987654332", flatCode: "F3", rent: 16000, headCount: 5, utilities: 2000, advance: 55000 },
  ];

  const tenants: { id: string; rent: number }[] = [];

  for (const t of tenantData) {
    info(`Creating tenant ${t.flatCode} — ${t.name}...`);

    const user = await prisma.user.create({
      data: {
        name: t.name,
        email: t.email,
        emailVerified: true,
        phone: t.phone,
        nid: t.nid,
        nidProof: `uploads/nid/tenant-${t.flatCode.toLowerCase()}.jpg`,
        userType: "TENANT",
      },
    });

    await prisma.account.create({
      data: {
        userId: user.id,
        accountId: user.email,
        providerId: "credential",
        password: passwordHash,
      },
    });

    const tenant = await prisma.tenant.create({
      data: {
        flatId: flatMap[t.flatCode],
        userId: user.id,
        whatsappNumber: t.phone,
        headCount: t.headCount,
        rent: t.rent,
        utilities: t.utilities,
        advance: t.advance ?? null,
        joinDate: new Date("2025-01-01"),
      },
    });

    tenants.push({ id: tenant.id, rent: t.rent });
    success(`${t.flatCode} — ${t.name}`);
    detail("Email", t.email);
    detail("Rent", `৳${t.rent}/mo`);
  }

  // ── Rent Transactions ──
  section("Creating rent transactions");

  const receivedByUsers = [admin.id, superAdmin.id];

  for (const tenant of tenants) {
    info(`Creating transactions for tenant...`);

    const prevMonthDate = new Date("2026-05-05");
    prevMonthDate.setDate(5 + Math.floor(Math.random() * 15));
    await prisma.rentTransaction.create({
      data: {
        tenantId: tenant.id,
        amount: tenant.rent,
        receivedById: receivedByUsers[Math.floor(Math.random() * receivedByUsers.length)],
        createdAt: prevMonthDate,
      },
    });

    const currMonthDate = new Date("2026-06-05");
    currMonthDate.setDate(5 + Math.floor(Math.random() * 10));
    await prisma.rentTransaction.create({
      data: {
        tenantId: tenant.id,
        amount: tenant.rent,
        receivedById: receivedByUsers[Math.floor(Math.random() * receivedByUsers.length)],
        createdAt: currMonthDate,
      },
    });

    success(`2 transactions created for ${tenant.id.slice(0, 8)}...`);
  }

  // ── Verification records ──
  section("Creating verification records");

  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 7);
  await prisma.verification.create({
    data: {
      identifier: "superadmin@ghoroa.com",
      value: "verified-email-token",
      expiresAt: pastDate,
    },
  });
  await prisma.verification.create({
    data: {
      identifier: "admin@ghoroa.com",
      value: "verified-email-token",
      expiresAt: pastDate,
    },
  });
  success("2 expired verification records created (for demo purposes)");

  // ── Summary ──
  section("Seed complete");
  const userCount = await prisma.user.count();
  const flatCount = await prisma.flat.count();
  const electricMeterCount = await prisma.electricMeter.count();
  const gasMeterCount = await prisma.gasMeter.count();
  const tenantCount = await prisma.tenant.count();
  const transactionCount = await prisma.rentTransaction.count();
  const accountCount = await prisma.account.count();

  console.log(`  ${C.green}Users:${C.reset}             ${userCount}`);
  console.log(`  ${C.green}Flats:${C.reset}             ${flatCount}`);
  console.log(`  ${C.green}Electric Meters:${C.reset}   ${electricMeterCount}`);
  console.log(`  ${C.green}Gas Meters:${C.reset}        ${gasMeterCount}`);
  console.log(`  ${C.green}Tenants:${C.reset}           ${tenantCount}`);
  console.log(`  ${C.green}Rent Transactions:${C.reset} ${transactionCount}`);
  console.log(`  ${C.green}Accounts:${C.reset}          ${accountCount}`);
  console.log(`  ${C.green}Verifications:${C.reset}     ${await prisma.verification.count()}`);
  console.log(`\n  ${C.yellow}Login credentials:${C.reset}`);
  console.log(`    ${C.dim}superadmin@ghoroa.com${C.reset} / password123`);
  console.log(`    ${C.dim}admin@ghoroa.com${C.reset}        / password123`);
  console.log(`    ${C.dim}<tenant-email>${C.reset}          / password123`);
  console.log(`\n${C.green}✓${C.reset}  Seed completed successfully.\n`);
}

main()
  .catch((e) => {
    console.error(`\n${C.red}✗ Seed failed:${C.reset} ${e.message}\n`, e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
