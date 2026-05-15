import { registerAs } from "@nestjs/config";
import { type Static, Type } from "@sinclair/typebox";

import { configValidator } from "src/utils/configValidator";

const schema = Type.Object({
  S3_ENDPOINT: Type.String(),
  /** Browser-reachable URL for presigned links (e.g. http://localhost:9100 when API uses http://minio:9000 in Docker) */
  S3_PUBLIC_ENDPOINT: Type.Optional(Type.String()),
  S3_REGION: Type.String(),
  S3_ACCESS_KEY_ID: Type.String(),
  S3_SECRET_ACCESS_KEY: Type.String(),
  S3_BUCKET_NAME: Type.String(),
});

type S3ConfigSchema = Static<typeof schema>;

const validateS3Config = configValidator(schema);

export default registerAs("s3", (): S3ConfigSchema => {
  const values = {
    S3_ENDPOINT: process.env.S3_ENDPOINT || "",
    S3_PUBLIC_ENDPOINT: process.env.S3_PUBLIC_ENDPOINT || "http://localhost:9100",
    S3_REGION: process.env.S3_REGION || "",
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID || "",
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY || "",
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || "",
  };
  return validateS3Config(values);
});
