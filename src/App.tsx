import { useState, useEffect } from "react";
import ItemList from "./components/ItemList";
import AllItems from "./data/all-items.json";
import { mergePrototype } from "./model/resolve-prototype";
// import "./App.css";

function App() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const newItems = AllItems.map((item) => {
            const merged = mergePrototype(item, AllItems);
            return merged;
        });
        setItems(newItems);
    }, [AllItems]);

    return (
        <div className="p-4">
            <ItemList items={items} />
        </div>
    );
}

export default App;
