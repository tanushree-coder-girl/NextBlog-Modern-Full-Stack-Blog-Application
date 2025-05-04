"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { useEffect, useState, ChangeEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import TipTapEditor from "@/components/TipTapEditor";
import { useRouter } from "next/navigation";
import { useAddBlogMutation } from "@/redux/api/blogApi";
import { useSnackbar } from "notistack";
import Image from "next/image";

const blogSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(5, "Title must be at least 5 characters"),

  excerpt: z
    .string()
    .nonempty("Excerpt is required")
    .min(10, "Excerpt must be at least 10 characters"),

  image: z.string().nonempty("Image is required"),

  slug: z.string().optional(),

  author: z.string().nonempty("Author is required"),

  date: z.string().optional(),

  content: z
    .string()
    .nonempty("Content is required")
    .min(20, "Content must be at least 20 characters"),
});

type BlogFormData = z.infer<typeof blogSchema>;

const AddBlog = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [addBlog, { isLoading }] = useAddBlogMutation();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: { content: "" },
  });

  const watchTitle = watch("title");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (user?.name) {
      setValue("author", user.name);
    }
  }, [user?.name, setValue]);

  useEffect(() => {
    const autoSlug = slugify(watchTitle || "", {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
    setValue("slug", autoSlug);
    setValue("slug", autoSlug);
  }, [watchTitle, setValue]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h6" color="text.secondary">
          Redirecting...
        </Typography>
      </div>
    );
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setValue("image", base64String);
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit: SubmitHandler<BlogFormData> = async (data) => {
    try {
      await addBlog(data).unwrap();
      enqueueSnackbar("Blog added successfully!", { variant: "success" });
      router.push("/blog");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`Failed to add blog`, { variant: "error" });
    }
  };

  return (
    <Box className="max-w-3xl mx-auto px-4">
      <Paper elevation={3} className="p-6 sm:p-10">
        <Typography variant="h5" className="font-semibold text-green-700 mb-6">
          Write a New Blog
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Stack spacing={2}>
            <TextField
              label="Title"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />

            <TextField
              label="Excerpt"
              {...register("excerpt")}
              error={!!errors.excerpt}
              helperText={errors.excerpt?.message}
              fullWidth
              multiline
              rows={2}
            />

            <Box>
              <InputLabel shrink className="mb-2">
                Upload Image
              </InputLabel>
              <Button
                variant="contained"
                component="label"
                className="!bg-green-600 hover:!bg-green-700 text-white"
              >
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>
              {errors.image && (
                <Typography color="error" variant="caption">
                  {errors.image.message}
                </Typography>
              )}
              {imagePreview && (
                <Box mt={2}>
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="rounded-md max-h-64 object-cover"
                  />
                </Box>
              )}
            </Box>

            <TextField
              label="Slug"
              {...register("slug")}
              InputLabelProps={{ shrink: true }}
              disabled
              error={!!errors.slug}
              helperText={errors.slug?.message}
              fullWidth
            />

            <TextField
              label="Author"
              {...register("author")}
              InputLabelProps={{ shrink: true }}
              disabled
              error={!!errors.author}
              helperText={errors.author?.message}
              fullWidth
            />

            <Box>
              <InputLabel shrink className="mb-2">
                Content
              </InputLabel>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TipTapEditor value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.content && (
                <Typography color="error" variant="caption">
                  {errors.content.message}
                </Typography>
              )}
            </Box>
          </Stack>

          <Button
            type="submit"
            variant="contained"
            className="!bg-green-600 hover:!bg-green-700 text-white w-full mt-6 rounded-full"
            disabled={isLoading}
            startIcon={
              isLoading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {isLoading ? "Publishing..." : "Publish Blog"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddBlog;
