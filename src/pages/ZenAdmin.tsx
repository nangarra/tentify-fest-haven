import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Search, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: 'new' | 'deposit_confirmed' | 'confirmed' | 'cancelled';
  deposit_confirmed: boolean;
  deposit_confirmed_at: string | null;
  admin_note: string | null;
  meta: any;
}

const ZenAdmin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    // Filter bookings based on search query
    if (searchQuery.trim() === "") {
      setFilteredBookings(bookings);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = bookings.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.email.toLowerCase().includes(query) ||
          b.phone.toLowerCase().includes(query)
      );
      setFilteredBookings(filtered);
    }
  }, [searchQuery, bookings]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Fel",
        description: "Kunde inte hämta bokningar.",
        variant: "destructive"
      });
    }
  };

  const toggleDepositConfirmation = async (booking: Booking) => {
    try {
      const newDepositStatus = !booking.deposit_confirmed;
      const updates: any = {
        deposit_confirmed: newDepositStatus,
        deposit_confirmed_at: newDepositStatus ? new Date().toISOString() : null,
      };

      // Update status if confirming deposit and current status is 'new'
      if (newDepositStatus && booking.status === 'new') {
        updates.status = 'deposit_confirmed';
      }
      // Revert status if deactivating deposit and current status is 'deposit_confirmed'
      else if (!newDepositStatus && booking.status === 'deposit_confirmed') {
        updates.status = 'new';
      }

      const { error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', booking.id);

      if (error) throw error;

      toast({
        title: "Uppdaterat",
        description: newDepositStatus ? "Förskott bekräftat" : "Förskottsbekräftelse borttagen"
      });

      await fetchBookings();
      
      // Update selected booking if in detail view
      if (selectedBooking?.id === booking.id) {
        const { data } = await supabase
          .from('bookings')
          .select('*')
          .eq('id', booking.id)
          .single();
        if (data) setSelectedBooking(data);
      }
    } catch (error) {
      console.error('Error toggling deposit:', error);
      toast({
        title: "Fel",
        description: "Kunde inte uppdatera förskottsbekräftelse.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async () => {
    if (!bookingToDelete) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingToDelete);

      if (error) throw error;

      toast({
        title: "Raderad",
        description: "Bokningen har raderats."
      });

      await fetchBookings();
      setDeleteDialogOpen(false);
      setBookingToDelete(null);
      
      // Close detail view if deleted booking was selected
      if (selectedBooking?.id === bookingToDelete) {
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast({
        title: "Fel",
        description: "Kunde inte radera bokningen.",
        variant: "destructive"
      });
    }
  };

  const saveAdminNote = async () => {
    if (!selectedBooking) return;

    setIsSavingNote(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ admin_note: adminNote })
        .eq('id', selectedBooking.id);

      if (error) throw error;

      toast({
        title: "Sparat",
        description: "Administratörsanteckning sparad."
      });

      await fetchBookings();
      
      // Update selected booking
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', selectedBooking.id)
        .single();
      if (data) setSelectedBooking(data);
    } catch (error) {
      console.error('Error saving note:', error);
      toast({
        title: "Fel",
        description: "Kunde inte spara anteckning.",
        variant: "destructive"
      });
    } finally {
      setIsSavingNote(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      new: { label: "Ny", variant: "secondary" },
      deposit_confirmed: { label: "Förskott OK", variant: "default" },
      confirmed: { label: "Bekräftad", variant: "default" },
      cancelled: { label: "Avbokad", variant: "destructive" }
    };
    const config = variants[status] || { label: status, variant: "outline" };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const openDeleteDialog = (bookingId: string) => {
    setBookingToDelete(bookingId);
    setDeleteDialogOpen(true);
  };

  const openDetailView = (booking: Booking) => {
    setSelectedBooking(booking);
    setAdminNote(booking.admin_note || "");
  };

  if (selectedBooking) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => setSelectedBooking(null)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Tillbaka till lista
        </Button>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{selectedBooking.name}</CardTitle>
                <CardDescription>
                  Bokad: {new Date(selectedBooking.created_at).toLocaleString('sv-SE')}
                </CardDescription>
              </div>
              {getStatusBadge(selectedBooking.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contact Details */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Kontaktuppgifter</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Telefon</Label>
                  <p className="font-medium">{selectedBooking.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">E-post</Label>
                  <p className="font-medium">{selectedBooking.email}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Message */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Meddelande</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{selectedBooking.message}</p>
            </div>

            <Separator />

            {/* Deposit Confirmation */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Förskottsbetalning</h3>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <Label className="text-base">
                    {selectedBooking.deposit_confirmed ? "Förskott bekräftat" : "Bekräfta förskott"}
                  </Label>
                  {selectedBooking.deposit_confirmed_at && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Bekräftat: {new Date(selectedBooking.deposit_confirmed_at).toLocaleString('sv-SE')}
                    </p>
                  )}
                </div>
                <Switch
                  checked={selectedBooking.deposit_confirmed}
                  onCheckedChange={() => toggleDepositConfirmation(selectedBooking)}
                />
              </div>
            </div>

            <Separator />

            {/* Admin Note */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Administratörsanteckning</h3>
              <Textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Lägg till intern anteckning..."
                rows={4}
                className="mb-3"
              />
              <Button
                onClick={saveAdminNote}
                disabled={isSavingNote}
              >
                {isSavingNote ? "Sparar..." : "Spara anteckning"}
              </Button>
            </div>

            <Separator />

            {/* Meta Data */}
            {selectedBooking.meta && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Metadata (JSON)</h3>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-auto">
                  {JSON.stringify(selectedBooking.meta, null, 2)}
                </pre>
              </div>
            )}

            <Separator />

            {/* Timestamps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Skapad</Label>
                <p>{new Date(selectedBooking.created_at).toLocaleString('sv-SE')}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Uppdaterad</Label>
                <p>{new Date(selectedBooking.updated_at).toLocaleString('sv-SE')}</p>
              </div>
            </div>

            {/* Delete Button */}
            <div className="pt-4">
              <Button
                variant="destructive"
                onClick={() => openDeleteDialog(selectedBooking.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Radera bokning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ZenAdmin - Tentify</h1>
        <p className="text-muted-foreground">Administrera bokningar</p>
      </div>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>Bokningar</CardTitle>
          <CardDescription>Alla inkomna bokningar</CardDescription>
          
          {/* Search */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Sök på namn, e-post eller telefon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {searchQuery ? "Inga bokningar hittades" : "Inga bokningar ännu"}
            </p>
          ) : (
            <div className="space-y-3">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => openDetailView(booking)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold truncate">{booking.name}</h3>
                        {getStatusBadge(booking.status)}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p className="truncate">{booking.email} • {booking.phone}</p>
                        <p className="text-xs">
                          {new Date(booking.created_at).toLocaleString('sv-SE')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div 
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Label className="text-sm">Förskott:</Label>
                        <Switch
                          checked={booking.deposit_confirmed}
                          onCheckedChange={() => toggleDepositConfirmation(booking)}
                        />
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteDialog(booking.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Radera bokning?</AlertDialogTitle>
            <AlertDialogDescription>
              Är du säker? Den här åtgärden kan inte ångras.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Avbryt</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Radera
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ZenAdmin;
