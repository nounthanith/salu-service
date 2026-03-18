import ShinyText from "@/components/ui/ShinyText";

type LoadingUIProps = {
    text: string;
};

export default function LoadingUI({ text }: LoadingUIProps) {
    return (
        <ShinyText
            text={text}
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
        />
    );
}