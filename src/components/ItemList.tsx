import ItemComponent from "./ItemComponent";

function ItemList({ items }: { items: Item[] }) {
    return (
        <div>
            {items.map((item) => (
                <ItemComponent
                    item={item}
                    combineNamedBehaviors={true}
                    key={item.id}
                />
            ))}
            <div className="items-center justify-center">
                <button className="btn btn-primary bg-neutral-700 p-2 w-full rounded-md">
                    Create
                </button>
            </div>
        </div>
    );
}

export default ItemList;
