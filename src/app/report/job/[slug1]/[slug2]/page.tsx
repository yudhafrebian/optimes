export default async function Page({
  params,
}: {
  params: Promise<{ slug1: string; slug2: string }>;
}) {
  const { slug1, slug2 } = await params;
  const url = `http://192.168.68.103:3000/d/taiyojobreport/embed?wo=${slug1}&wc=${slug2}&ev=Setup`;
  return (
    <iframe
      // style="border:1px #FFFFFF none"
      src={url}
      title="iFrame"
      width="100%"
      height="700px"
      scrolling="yes"
      // frameborder="no"
      allow="fullscreen"
    ></iframe>
  );
}
