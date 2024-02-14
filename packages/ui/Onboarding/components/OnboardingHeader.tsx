import { Logo } from "../../Logo";
import { ProgressBar } from "../../ProgressBar";

interface OnboardingHeaderProps {
  progress: number;
}
export default function OnboardingHeader({ progress }: OnboardingHeaderProps) {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-6 items-center  pt-8">
      <div className="col-span-2">
        <Logo className="ml-4 w-1/2" />
      </div>
      <div className="col-span-1" />
      <div className="col-span-3 flex items-center justify-center gap-8">
        <div className="relative grow overflow-hidden rounded-full bg-slate-200">
          <ProgressBar progress={progress / 100} barColor="bg-brand-dark" height={2} />
        </div>
        <span className="font-medium">{progress}% complete</span>
      </div>
    </div>
  );
}
