import ReportFrame from "./ReportFrame";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug1: string; slug2: string }>;
  searchParams?: Promise<{ print?: string; source?: string, delay?: string }>;
}) {
  const { slug1, slug2 } = await params;
  const resolvedSearchParams = await searchParams;
  const autoPrint = resolvedSearchParams?.print === "1";
  const mode = resolvedSearchParams?.source === "image" ? "image" : "embed";
  const delay = Number(resolvedSearchParams?.delay ?? 30000);
  const url =
    mode === "image"
      ? `http://192.168.68.9:3000/api/render-image?wo=${slug1}&wc=${slug2}&ev=Setup&slug=taiyojobreport&delayMs=${delay}`
      : `http://192.168.68.9:3000/d/taiyojobreport/embed?wo=${slug1}&wc=${slug2}&ev=Setup`;

  return <ReportFrame url={url} autoPrint={autoPrint} mode={mode} delay={delay} />;
}
