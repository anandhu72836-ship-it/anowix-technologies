
# Anowix Technologies — Production Build Checklist

## Phase 2
- Create Supabase project.
- Run `supabase_schema.sql`.
- Enable email authentication.
- Add role-based access for student/customer/admin.
- Connect public forms to Supabase.
- Build admin dashboard with protected routes.

## Payment
Use a compliant Indian UPI/payment-provider integration that supports server-side payment verification.
Do not mark a registration paid from a client-side button or screenshot alone.
Keep provider secrets only on the server.

## Certificates
- Admin marks registration completed.
- Generate unique certificate number.
- Generate PDF from a controlled template.
- Store PDF in private/object storage.
- Give the student a signed/authorized download URL.

## Email
Use a transactional email provider.
Send:
- registration confirmation
- payment confirmation
- webinar/hackathon reminders
- completion notice
- certificate-ready email
- customer project-status updates

## Hosting
- Deploy frontend to Vercel or another suitable host.
- Store secrets in environment variables.
- Connect production Supabase project.
- Configure custom domain and HTTPS.
- Test authentication, forms, database permissions, payments, certificates and email before public launch.

## Important
The current MVP is intentionally a frontend demo. It does not contain real payment credentials, email credentials, or a production database connection.
