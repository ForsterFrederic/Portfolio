import dynamic from "next/dynamic";

const Component = dynamic(() => import("./../_components/Home"), { ssr: false });

export default function Home() {
    return <Component />;
}