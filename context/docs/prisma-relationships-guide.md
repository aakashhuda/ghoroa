# Prisma Relationships Guide

## 1. One-to-One (1:1)

Example: A user has exactly one profile.

```prisma
model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique

  profile Profile?
}

model Profile {
  id      Int    @id @default(autoincrement())
  bio     String?

  userId  Int    @unique
  user    User   @relation(fields: [userId], references: [id])
}
```

### Database Structure

```text
User
----
id (PK)
email

Profile
-------
id (PK)
bio
userId (FK, UNIQUE)
```

The `@unique` on `userId` ensures that each profile belongs to only one user and each user can have only one profile.

---

## 2. One-to-Many (1:N)

Example: A user can have many posts.

```prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique

  posts Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String

  authorId Int
  author   User   @relation(fields: [authorId], references: [id])
}
```

### Database Structure

```text
User
----
id (PK)
email

Post
----
id (PK)
title
authorId (FK)
```

Here:

- One `User` → Many `Post`
- Each `Post` → One `User`

---

## 3. Many-to-Many (M:N) - Implicit

Example: Students can enroll in many courses, and courses can have many students.

```prisma
model Student {
  id      Int      @id @default(autoincrement())
  name    String

  courses Course[]
}

model Course {
  id       Int       @id @default(autoincrement())
  title    String

  students Student[]
}
```

Prisma automatically creates the junction table:

```text
_StudentToCourse
----------------
A (Student FK)
B (Course FK)
```

You don't need to define the join table yourself.

---

## 4. Many-to-Many (M:N) - Explicit Junction Table

Use this when you need extra fields on the relationship.

Example: A student enrolls in a course and you want to store enrollment date.

```prisma
model Student {
  id          Int          @id @default(autoincrement())
  name        String

  enrollments Enrollment[]
}

model Course {
  id          Int          @id @default(autoincrement())
  title       String

  enrollments Enrollment[]
}

model Enrollment {
  studentId  Int
  courseId   Int
  enrolledAt DateTime @default(now())

  student    Student @relation(fields: [studentId], references: [id])
  course     Course  @relation(fields: [courseId], references: [id])

  @@id([studentId, courseId])
}
```

### Database Structure

```text
Student
-------
id

Course
------
id

Enrollment
----------
studentId (FK)
courseId  (FK)
enrolledAt
```

---

## Real-World Example

An e-commerce application often uses all three relationship types:

```prisma
model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique

  profile  Profile?
  orders   Order[]
}

model Profile {
  id      Int    @id @default(autoincrement())

  userId  Int    @unique
  user    User   @relation(fields: [userId], references: [id])
}

model Order {
  id       Int    @id @default(autoincrement())

  userId   Int
  user     User   @relation(fields: [userId], references: [id])

  products OrderProduct[]
}

model Product {
  id       Int    @id @default(autoincrement())
  name     String

  orders   OrderProduct[]
}

model OrderProduct {
  orderId   Int
  productId Int
  quantity  Int

  order      Order   @relation(fields: [orderId], references: [id])
  product    Product @relation(fields: [productId], references: [id])

  @@id([orderId, productId])
}
```

This demonstrates:

- **User ↔ Profile** → One-to-One
- **User → Orders** → One-to-Many
- **Orders ↔ Products** → Many-to-Many (explicit join table)
