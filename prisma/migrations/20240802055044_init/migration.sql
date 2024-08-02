-- 2024XXXX_add-image-url-to-post/migration.sql
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "heading" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "blogUrlLinks" TEXT NOT NULL,
    "blogPostDate" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,  -- Nullable field for image URL

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
