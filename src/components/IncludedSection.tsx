import { Card } from "@/components/ui/card";

// Import images for included items
import tarpImage from "@/assets/tarp-ovan-taltet.png";
import chairsTableImage from "@/assets/tva-stolar-bord.png";
import mattaBlanketImage from "@/assets/matta-filt.png";
import lanternSpeakerImage from "@/assets/lykta-med-hogtalare.png";
import deluxeBedImage from "@/assets/deluxe-uppblasbar-sang.png";
import electricityImage from "@/assets/el-indragen.png";
import nightstandImage from "@/assets/nattduksbord.png";
import goodiebagImage from "@/assets/goodiebag-picknickkorg.png";

// Import images for left column
import tentInteriorImage from "@/assets/festival-talt-inredning-lyxig-camping.webp";
import tentExteriorImage from "@/assets/glamping-talt-naturmiljo-skane.webp";

const includedItems = [
  {
    image: tarpImage,
    title: "Tarp ovan tältet",
    description: "UV-skydd, regnskydd, svalare på dagen"
  },
  {
    image: chairsTableImage,
    title: "Två stolar + bord",
    description: "Kan användas inne eller ute"
  },
  {
    image: mattaBlanketImage,
    title: "Matta & filt",
    description: "Bekvämt och mysigt underlag"
  },
  {
    image: lanternSpeakerImage,
    title: "Lykta med högtalare",
    description: "Belysning och naturljud för atmosfär"
  },
  {
    image: deluxeBedImage,
    title: "Deluxe uppblåsbar säng",
    description: "Bekväm sömn"
  },
  {
    image: electricityImage,
    title: "El indragen",
    description: "Praktisk elförsörjning i tältet"
  },
  {
    image: nightstandImage,
    title: "Nattduksbord",
    description: "Praktisk förvaring vid sängen"
  },
  {
    image: goodiebagImage,
    title: "Goodiebag & picknickkorg",
    description: "Toapapper, våtservetter, mobilladdare, 2 muggar, bestick, 2 glas"
  }
];

const IncludedSection = () => {
  return (
    <section id="vad-ingar" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Det här ingår i varje tält
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vi har tänkt på allt för att göra din festivalupplevelse så bekväm som möjligt. 
              Här är vad som väntar dig i ditt Tentify-tält.
            </p>
          </div>

          {/* Two-column layout: Images left, Items right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Images */}
            <div className="space-y-6">
              {/* First image */}
              <div className="relative">
                <img
                  src={tentInteriorImage}
                  alt="Glampingtält – interiördetalj"
                  loading="lazy"
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-elegant"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>
              
              {/* Second image */}
              <div className="relative">
                <img
                  src={tentExteriorImage}
                  alt="Glampingtält – exteriör/tarp"
                  loading="lazy"
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-elegant"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>
            </div>
            
            {/* Right column - Items grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {includedItems.map((item, index) => (
                <Card key={index} className="p-6 shadow-card hover:shadow-elegant transition-smooth">
                  <div className="bg-primary/10 w-32 h-32 rounded-lg flex items-center justify-center mb-4 p-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Card className="p-8 bg-secondary/30 border-primary/20 shadow-elegant callout-glow">
              <div className="flex items-center justify-center mb-4">
                <span className="text-2xl mr-3 emoji-float">✨</span>
                <h3 className="text-2xl font-bold text-foreground">
                  Allt klart när du anländer!
                </h3>
              </div>
              <p className="text-lg text-muted-foreground">
                Du behöver bara ta med dina personliga saker, mat och dryck. 
                Vi ordnar resten för din bekvämlighet.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncludedSection;