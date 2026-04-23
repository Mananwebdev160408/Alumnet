import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TEST_CREDENTIALS, TestRole } from "@/lib/testCredentials";
import { seedTestUsers } from "@/lib/firebaseSeeding";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  Database,
  Flower,
  RefreshCw,
  Scroll,
  Sparkles,
} from "lucide-react";

interface TestCredentialsDialogProps {
  onSelect: (email: string, password: string) => void;
  isOpen?: boolean;
}

export const TestCredentialsDialog = ({ onSelect, isOpen = false }: TestCredentialsDialogProps) => {
  const [open, setOpen] = useState(isOpen);
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const results = await seedTestUsers();
      const successCount = results.filter((result) => result.success).length;
      toast({
        title: "Test records synced",
        description: `Successfully etched ${successCount} node(s) into the archive.`,
      });
    } catch (error: any) {
      toast({
        title: "Seeding failed",
        description: error.message || "The lineage records could not be initialized.",
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[calc(100vw-1rem)] max-w-[1100px] max-h-[calc(100vh-1rem)] overflow-hidden border-2 border-border/80 bg-[rgba(247,243,233,0.96)] p-0 shadow-[18px_18px_0_0_rgba(26,26,26,0.12)] backdrop-blur sm:w-[calc(100vw-2rem)] sm:max-h-[calc(100vh-2rem)]">
        <div className="absolute inset-0 mountain-bg opacity-[0.12]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,243,233,0.12)_0%,rgba(247,243,233,0.86)_55%,rgba(247,243,233,0.98)_100%)]" />

        <div className="relative z-10 grid gap-0 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative min-h-[240px] overflow-hidden border-b border-border/10 lg:min-h-full lg:border-b-0 lg:border-r">
            <img
              src="/japanese_sakura_mountains_sketch.png"
              alt="Sketch mountains with sakura trees"
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,243,233,0.10)_0%,rgba(247,243,233,0.54)_52%,rgba(247,243,233,0.96)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(247,243,233,0.92))]" />

            <div className="absolute left-6 top-6 flex items-center gap-3 rounded-full border border-border/20 bg-background/80 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-primary backdrop-blur">
              <Scroll className="size-3" />
              Test credentials
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="max-w-sm space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.45em] text-foreground/45">Quick access</p>
                <h3 className="text-3xl font-semibold leading-tight text-foreground">
                  Choose a role and fill the form in one click.
                </h3>
                <p className="text-sm leading-6 text-foreground/70">
                  This panel keeps the test flow visible without overwhelming the login screen.
                </p>
              </div>
            </div>
          </div>

          <div className="max-h-[calc(100vh-10rem)] overflow-y-auto p-5 sm:max-h-[calc(100vh-12rem)] sm:p-8 lg:max-h-[calc(100vh-2rem)] lg:p-10">
            <DialogHeader className="space-y-3 pb-6 text-left">
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-border/20 bg-background/80 px-4 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                <Sparkles className="size-3" />
                Demo credentials
              </div>
              <DialogTitle className="text-3xl font-semibold tracking-tight text-foreground">
                Pick a role
              </DialogTitle>
              <DialogDescription className="text-sm leading-6 text-foreground/65">
                Select one of the prepared accounts to preload the auth form. The dialog now follows the delayed open state correctly.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 sm:grid-cols-2">
              {(Object.entries(TEST_CREDENTIALS) as [TestRole, typeof TEST_CREDENTIALS.alumni][]).map(([key, data], index) => (
                <motion.button
                  key={key}
                  type="button"
                  onClick={() => {
                    onSelect(data.email, data.password);
                    setOpen(false);
                  }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="group relative overflow-hidden border border-border/70 bg-background/90 p-5 text-left transition hover:-translate-y-0.5 hover:border-primary hover:shadow-[8px_8px_0_0_rgba(26,26,26,0.08)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-primary">{data.label}</p>
                      <h4 className="mt-2 text-xl font-semibold text-foreground">{data.name}</h4>
                    </div>
                    <Flower className="size-5 text-primary/35 transition group-hover:text-primary" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-foreground/60">{data.description}</p>
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-foreground/35">
                    Tap to load credentials
                  </p>
                </motion.button>
              ))}
            </div>

            <div className="mt-8 border-t border-border/15 pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-foreground/45">Seed data</p>
                  <p className="text-sm text-foreground/65">
                    Use this when the test accounts are not yet available in the current environment.
                  </p>
                </div>
                <Button
                  variant="outline"
                  disabled={isSeeding}
                  onClick={handleSeed}
                  className="h-12 rounded-none border-2 border-border/70 bg-background px-5 text-[10px] font-black uppercase tracking-[0.35em] text-foreground transition hover:border-primary hover:bg-primary/5"
                >
                  {isSeeding ? (
                    <RefreshCw className="mr-2 size-4 animate-spin text-primary" />
                  ) : (
                    <Database className="mr-2 size-4 text-primary" />
                  )}
                  Seed records
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
