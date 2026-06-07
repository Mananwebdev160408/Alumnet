import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, Megaphone, Trash2, Calendar, Users, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { subscribeToAnnouncements, createAnnouncement, deleteAnnouncement } from "@/lib/firestoreService";
import type { Announcement } from "@/lib/types";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function Announcements() {
  const { userProfile } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", target: "All", message: "" });

  useEffect(() => {
    if (!userProfile?.collegeId) return;
    const unsub = subscribeToAnnouncements(userProfile.collegeId, (data) => {
      setAnnouncements(data);
      setLoading(false);
    });
    return unsub;
  }, [userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.message || !userProfile?.collegeId) return;
    setSubmitting(true);
    try {
      await createAnnouncement({
        collegeId: userProfile.collegeId,
        title: formData.title,
        target: formData.target,
        message: formData.message,
      });
      toast.success(`Announcement broadcast to ${formData.target} users!`);
      setFormData({ title: "", target: "All", message: "" });
    } catch {
      toast.error("Failed to post announcement.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteAnnouncement(id);
      toast.success("Announcement removed.");
    } catch {
      toast.error("Failed to delete announcement.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Campus Announcements</h2>
          <p className="text-muted-foreground">Compose and broadcast messages to your institution's network.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Compose */}
        <div className="lg:col-span-2">
          <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="uppercase text-sm tracking-wider flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" /> Compose Announcement
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Headline / Title *</span>
                  <Input
                    placeholder="e.g. Placement Drive or Event Update"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="rounded-none border-2 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Target Audience</span>
                  <Select value={formData.target} onValueChange={(val) => setFormData({ ...formData, target: val })}>
                    <SelectTrigger className="rounded-none border-2 border-border bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Users</SelectItem>
                      <SelectItem value="Students">Students Only</SelectItem>
                      <SelectItem value="Alumni">Alumni Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Message Body *</span>
                  <Textarea
                    placeholder="Compose your announcement here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="rounded-none border-2 border-border min-h-[120px] resize-none"
                  />
                </div>
              </CardContent>
              <CardFooter className="p-6 border-t border-border flex justify-end">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary hover:bg-primary/95 text-white border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none uppercase text-xs font-bold"
                >
                  {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Volume2 className="mr-2 h-4 w-4" />}
                  Broadcast Message
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* History */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-2">
            History Log ({announcements.length})
          </h3>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : announcements.length === 0 ? (
            <div className="border border-border py-12 text-center text-muted-foreground text-sm font-medium">
              No past announcements on record.
            </div>
          ) : (
            announcements.map((ann) => (
              <Card key={ann.id} className="border border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="font-bold text-[9px] uppercase tracking-wider border-primary text-primary bg-primary/5">
                          <Users className="h-3 w-3 mr-1" /> {ann.target}
                        </Badge>
                        <span className="text-xs font-semibold text-muted-foreground flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {ann.createdAt
                            ? formatDistanceToNow(ann.createdAt, { addSuffix: true })
                            : ""}
                        </span>
                      </div>
                      <h4 className="font-bold text-lg leading-tight uppercase pt-1">{ann.title}</h4>
                      <p className="text-sm font-medium text-foreground/80 leading-relaxed pt-2">{ann.message}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 shrink-0"
                      disabled={deletingId === ann.id}
                      onClick={() => handleDelete(ann.id)}
                    >
                      {deletingId === ann.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
