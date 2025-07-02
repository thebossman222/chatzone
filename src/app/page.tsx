import { InputForm } from "@/components/FormParts/input-field";
import { MessageScreen } from "@/components/FormParts/screen";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <Card className="w-full max-w-4xl backdrop-blur-lg bg-slate-800/70 shadow-2xl border border-slate-700 rounded-3xl">
        <CardHeader className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-wide">
            Welcome to <span className="text-blue-400">ChatZone</span>
          </h1>
          <h2 className="text-lg text-slate-300">By Caleb Krainman</h2>
          <p className="text-sm text-slate-400 italic">Please Be Respectful</p>
          <Separator className="my-4 bg-slate-600" />
        </CardHeader>

        <CardContent className="h-full">
          <div className="bg-gradient-to-br from-blue-400 via-blue-300 to-blue-400 p-4 rounded-2xl shadow-inner overflow-hidden">
            <MessageScreen />
          </div>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-2">
          <InputForm />
        </CardFooter>
      </Card>
    </main>
  );
}
