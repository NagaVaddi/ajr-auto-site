import { ShieldCheck, FileSearch, Globe, Truck } from 'lucide-react';

const items = [
  {
    icon: ShieldCheck,
    title: 'Fully Inspected',
    desc: 'Every vehicle passes a 150-point inspection before listing — engine, body, electrics, all checked.',
  },
  {
    icon: FileSearch,
    title: 'Full History',
    desc: 'Japanese auction sheets, dealer records, and Korean inspection reports included with every car.',
  },
  {
    icon: Globe,
    title: 'Worldwide Export',
    desc: 'We handle all export paperwork, deregistration, and shipping to your country door-to-door.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Cars ship within 2 weeks of payment. Average transit time 2–4 weeks depending on destination.',
  },
];

export default function TrustBar() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-[#0A2540] text-center mb-10">
          Why Choose AJR Auto
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#F8FAFC] hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#0A2540] mb-4">
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="font-bold text-[#0A2540] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
