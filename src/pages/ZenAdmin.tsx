import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface BookingExtras {
  baddset?: boolean;
  upgrade_to_double?: boolean;
  extra_chair?: boolean;
  towel?: boolean;
  water_boiler?: boolean;
  breakfast?: number;
  insurance?: boolean;
  extra_persons?: number;
}

interface Booking {
  id: string;
  booking_type: string;
  festival?: string;
  tent_size: string;
  rental_days?: number;
  address?: string;
  extras: BookingExtras;
  price_total: number;
  prepayment: number;
  deposit: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  created_at: string;
  paid_prepayment: boolean;
}

const ZenAdmin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inventory, setInventory] = useState({
    festival: { single: 5, double: 4 }
  });

  useEffect(() => {
    // Mock data for demonstration - replace with real API calls
    const mockBookings: Booking[] = [
      {
        id: "1",
        booking_type: "festival",
        festival: "Sweden Rock",
        tent_size: "dubbel",
        extras: {
          baddset: true,
          breakfast: 2,
          extra_persons: 1
        },
        price_total: 8500,
        prepayment: 1700,
        deposit: 1500,
        customer_name: "Erik Andersson",
        customer_email: "erik@example.com",
        customer_phone: "070-123456",
        created_at: "2024-03-15T10:30:00Z",
        paid_prepayment: true
      }
    ];
    setBookings(mockBookings);
  }, []);

  const formatExtras = (extras: BookingExtras) => {
    const items = [];
    if (extras.baddset) items.push("Bäddset");
    if (extras.upgrade_to_double) items.push("Uppgradera till dubbelsäng");
    if (extras.extra_chair) items.push("Extra stol");
    if (extras.towel) items.push("Handduk");
    if (extras.water_boiler) items.push("Vattenkokare");
    if (extras.breakfast) items.push(`Frukost (${extras.breakfast} dagar)`);
    if (extras.insurance) items.push("Fylleförsäkring");
    if (extras.extra_persons) items.push(`Extra personer: ${extras.extra_persons}`);
    return items.length > 0 ? items.join(", ") : "Inga extraval";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ZenAdmin - Tentify</h1>
        <p className="text-muted-foreground">Administrera bokningar och lager</p>
      </div>

      {/* Inventory Status */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Lagerstatus</CardTitle>
          <CardDescription>Aktuellt antal tillgängliga tält</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Singel</h3>
              <span className="text-2xl font-bold">{inventory.festival.single}</span>
              <p className="text-sm text-muted-foreground">tillgängliga</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Dubbel</h3>
              <span className="text-2xl font-bold">{inventory.festival.double}</span>
              <p className="text-sm text-muted-foreground">tillgängliga</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>Bokningar</CardTitle>
          <CardDescription>Alla inkomna bokningar</CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Inga bokningar ännu</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.customer_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.customer_email} • {booking.customer_phone}
                      </p>
                    </div>
                    <Badge variant={booking.paid_prepayment ? "default" : "secondary"}>
                      {booking.paid_prepayment ? "Förskott betalt" : "Väntar på betalning"}
                    </Badge>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h4 className="font-medium mb-2">Bokningsdetaljer</h4>
                      <p><span className="text-sm text-muted-foreground">Typ:</span> {booking.booking_type === "festival" ? "🎪 Festival" : "📦 Halvpall"}</p>
                      {booking.festival && (
                        <p><span className="text-sm text-muted-foreground">Festival:</span> {booking.festival}</p>
                      )}
                      <p><span className="text-sm text-muted-foreground">Tältstorlek:</span> {booking.tent_size}</p>
                      {booking.rental_days && (
                        <p><span className="text-sm text-muted-foreground">Hyrdagar:</span> {booking.rental_days}</p>
                      )}
                      {booking.address && (
                        <p><span className="text-sm text-muted-foreground">Adress:</span> {booking.address}</p>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Priser</h4>
                      <p><span className="text-sm text-muted-foreground">Totalt:</span> {booking.price_total.toLocaleString()} kr</p>
                      <p><span className="text-sm text-muted-foreground">Förskott:</span> {booking.prepayment.toLocaleString()} kr</p>
                      <p><span className="text-sm text-muted-foreground">Deposition:</span> {booking.deposit.toLocaleString()} kr</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Extraval</h4>
                    <p className="text-sm">{formatExtras(booking.extras)}</p>
                  </div>
                  
                  <div className="mt-3 text-xs text-muted-foreground">
                    Bokad: {new Date(booking.created_at).toLocaleString('sv-SE')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ZenAdmin;