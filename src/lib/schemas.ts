import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),

  plan: z.enum(["free", "premium"], {
    required_error: "Pilih salah satu plan",
  }),

  childAge: z.enum(["belum_lahir", "0_6_bulan", "7_12_bulan", "1_2_tahun", "2_5_tahun"], {
    required_error: "Pilih usia anak",
  }),

  biggestConcern: z.string().max(150, "Maksimal 150 karakter").optional(),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;
