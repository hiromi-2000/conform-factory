import { z } from "zod/v4";
export type SimpleSchema = z.ZodObject<z.ZodRawShape>;

export type UnionSchema = z.ZodUnion<SimpleSchema[]>;

export type DiscriminatedUnionSchema = z.ZodDiscriminatedUnion<SimpleSchema[]>;

export type FormSchema = SimpleSchema | UnionSchema | DiscriminatedUnionSchema;
