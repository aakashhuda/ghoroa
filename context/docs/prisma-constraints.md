# Prisma Constraints Reference

## Schema-Level Constraints

### String Max Length

```prisma
model User {
  name    String  @db.VarChar(100)    // max 100 chars
  bio     String  @db.VarChar(500)
  code    String  @db.Char(10)        // fixed 10 chars
  content String  @db.Text            // unlimited
}
```

### Decimal Places

```prisma
model Product {
  price    Decimal  @db.Decimal(10, 2)  // 10 digits total, 2 decimal places
  tax      Decimal  @db.Decimal(5, 4)   // e.g. 0.1234

  // Float/Double (less precise)
  rating   Float    @db.Float           // 4-byte
  score    Float    @db.DoublePrecision // 8-byte
}
```

### Integer Sizes

```prisma
model Item {
  smallNum  Int  @db.SmallInt    // -32768 to 32767
  normalNum Int                  // standard Int
  bigNum    BigInt               // very large numbers
  tinyNum   Int  @db.TinyInt     // 0–255 (MySQL only)
}
```

### Unique Constraint

```prisma
model User {
  email    String  @unique
  username String  @unique

  // Composite unique
  @@unique([firstName, lastName])
}
```

### Default Values

```prisma
model Post {
  status    String   @default("draft")
  views     Int      @default(0)
  createdAt DateTime @default(now())
  uuid      String   @default(uuid())
  cuid      String   @default(cuid())
}
```

### Not Null vs Optional

```prisma
model User {
  required  String         // NOT NULL
  optional  String?        // nullable
}
```

### Check Constraints (Prisma 4.7+)

```prisma
model Product {
  price Decimal

  @@check(price > 0, name: "price_positive")
  @@check(price < 100000, name: "price_max")
}
```

---

## Relational Constraints

```prisma
model Post {
  id       Int   @id
  authorId Int

  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)
  //                                                          onDelete: Restrict | SetNull | NoAction
}
```

---

## Validation in Application Layer

Prisma does not validate things like min/max values at the schema level beyond what the DB supports. Use a validation library alongside it:

```ts
// Using Zod + Prisma
import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(2).max(100),
  age: z.number().int().min(0).max(120),
  email: z.string().email(),
  price: z.number().multipleOf(0.01).positive(),
});

// Validate before saving
const data = UserSchema.parse(req.body);
await prisma.user.create({ data });
```

---

## Quick Reference Table

| Constraint           | Prisma Syntax                        |
| -------------------- | ------------------------------------ |
| Max string length    | `@db.VarChar(n)`                     |
| Decimal precision    | `@db.Decimal(precision, scale)`      |
| Unique               | `@unique` or `@@unique([...])`       |
| Not null             | `Field Type` (no `?`)                |
| Nullable             | `Field Type?`                        |
| Default value        | `@default(value)`                    |
| Primary key          | `@id`                                |
| Check constraint     | `@@check(condition)`                 |
| Foreign key behavior | `onDelete: Cascade/Restrict/SetNull` |

> **Note:** `@db.*` attributes are database-specific. The exact options vary between PostgreSQL, MySQL, and SQLite.
> See the [Prisma DB types docs](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#model-field-scalar-types) for your specific database.
