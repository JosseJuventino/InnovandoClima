export function HeaderInfo({ tabs, selectedTab, setSelectedTab }) {
    return (
        <div className="flex flex-row justify-around w-full">
            {tabs.map((tab, index) => (
                <a
                    key={index}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setSelectedTab(tab.name);
                    }}
                    className={`font-semibold ${selectedTab === tab.name ? 'text-black' : 'text-gray-400'}`}
                >
                    {tab.name}
                </a>
            ))}
        </div>
    );
}
