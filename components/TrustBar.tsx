import { ShieldCheck, FileSearch, RefreshCw, Percent } from 'lucide-react';

const items = [
  {
    icon: ShieldCheck,
    title: 'Проверка по 150 пунктам',
    desc: 'Каждый автомобиль проходит детальную диагностику перед продажей',
  },
  {
    icon: FileSearch,
    title: 'Гарантия юр. чистоты',
    desc: 'Проверка по базам ГИБДД, ФСП, залогов и ограничений',
  },
  {
    icon: RefreshCw,
    title: 'Trade-in за 1 день',
    desc: 'Сдайте ваш автомобиль в зачёт и получите новый уже сегодня',
  },
  {
    icon: Percent,
    title: 'Автокредит от 5%',
    desc: 'Партнёрство с 15 банками. Одобрение за 30 минут',
  },
];

export default function TrustBar() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-[#0A2540] text-center mb-10">
          Почему выбирают нас
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
