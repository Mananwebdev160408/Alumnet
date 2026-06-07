import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { UploadCloud, FileText, Trash2, Download, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function BulkImport() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null);
  const [previewData, setPreviewData] = useState<Array<{ name: string; email: string; role: string; year: string }>>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.name.endsWith(".csv")) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a CSV formatted file.",
          variant: "destructive"
        });
        return;
      }
      setUploadedFile({ name: file.name, size: file.size });
      
      // Seed preview data
      setPreviewData([
        { name: "John Doe", email: "john.doe@student.edu", role: "student", year: "2027" },
        { name: "Jane Watson", email: "jane.watson@alumni.edu", role: "alumni", year: "2018" },
        { name: "Robert Fox", email: "robert.fox@alumni.edu", role: "alumni", year: "2015" }
      ]);

      toast({
        title: "CSV Attached",
        description: "Preview roster successfully populated."
      });
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setPreviewData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImport = () => {
    toast({
      title: "Roster Imported",
      description: "Invitation emails sent to all imported accounts."
    });
    handleRemoveFile();
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-8 pt-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Bulk User Import</h2>
          <p className="text-muted-foreground">Upload CSV lists of students and alumni to provision invitations in bulk.</p>
        </div>
        <Button variant="outline" className="rounded-none border-2 border-border uppercase text-xs font-bold">
          <Download className="mr-2 h-4 w-4" /> Download Template CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
            <CardHeader className="border-b border-border">
              <CardTitle className="uppercase text-sm tracking-wider">CSV Upload</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv"
                className="hidden"
              />
              {!uploadedFile ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border p-6 text-center cursor-pointer hover:bg-muted/10 transition-colors flex flex-col items-center justify-center gap-2"
                >
                  <UploadCloud className="h-8 w-8 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider">Select Roster CSV</span>
                  <span className="text-[10px] text-muted-foreground font-semibold">Columns: Name, Email, Role, Year</span>
                </div>
              ) : (
                <div className="border-2 border-border p-4 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs font-bold truncate max-w-[150px]">{uploadedFile.name}</p>
                      <p className="text-[10px] text-muted-foreground">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={handleRemoveFile} className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
            {uploadedFile && (
              <CardFooter className="p-6 border-t border-border">
                <Button className="w-full bg-primary hover:bg-primary/95 text-white border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none uppercase text-xs font-bold" onClick={handleImport}>
                  Confirm & Import Users
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="border-border shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="uppercase text-sm tracking-wider">Roster Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 border-b border-border text-muted-foreground uppercase text-xs font-bold">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {previewData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 font-bold uppercase">{row.name}</td>
                      <td className="px-6 py-4 font-semibold text-muted-foreground">{row.email}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="uppercase text-[9px] font-bold">
                          {row.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-semibold">{row.year}</td>
                    </tr>
                  ))}
                  {previewData.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-muted-foreground text-sm font-medium">
                        Upload a CSV file to preview the roster.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
