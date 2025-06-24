import Icon from "@/components/ui/icon";

const Navigation = () => {
  const navItems = [
    { name: "Главная", icon: "Home", active: true },
    { name: "Популярные", icon: "TrendingUp", active: false },
    { name: "Подписки", icon: "Users", active: false },
    { name: "Загрузить", icon: "Upload", active: false },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-pink-400 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-2">
              <Icon name="Play" size={32} className="text-purple-500" />
            </div>
            <h1 className="text-white text-2xl font-bold font-rubik">
              КидВидео
            </h1>
          </div>

          <div className="flex space-x-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                  item.active
                    ? "bg-white text-purple-500 shadow-md"
                    : "text-white hover:bg-white/20"
                }`}
              >
                <Icon name={item.icon} size={24} />
                <span className="text-sm font-medium mt-1">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
