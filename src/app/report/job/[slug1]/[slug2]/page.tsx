export default async function Page({
  params,
}: {
  params: Promise<{ slug1: string; slug2: string }>;
}) {
  const { slug1, slug2 } = await params;
  const url = `http://192.168.68.9:3000/d/dashboard-a/view?WO=${slug1}&WC=${slug2}`;
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
