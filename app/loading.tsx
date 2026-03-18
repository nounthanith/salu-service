import LoadingUI from "@/components/shared/LoadingUI";

export default function Loading() {
    return <div className="flex justify-center items-center h-screen">
        <LoadingUI text="Loading" />
    </div>;
}