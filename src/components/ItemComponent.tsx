import { useState } from "react";
import Badge from "./Badge";
import { emojisForItemEffect, STAT_EMOJI } from "../model/item-emojis";
import ITEM_IMAGES from "../data/item-images.json";
// import { combineNamedItemBehaviors } from "../model/item-behaviors";

function ItemBehaviorEffect({ effect }: { effect: ItemEffect }) {
    const emojis = emojisForItemEffect(effect);
    const renderTargetAction = () => {
        let text = "";
        switch (effect.action) {
            case "Buff":
                text += `+${effect.amount} `;
                break;
            case "Debuff":
                text += `-${effect.amount} `;
                break;
            case "SetMax":
                return (
                    <>
                        <span className="text-neutral-200 text-xs p-1">
                            {emojis.stat}
                        </span>
                        <span className="text-neutral-100">
                            Increase max {effect.stat} by +{effect.amount}
                        </span>
                    </>
                );
            default:
                break;
        }
        text += effect.stat + " to " + effect.target;
        if (effect.isRecurring) {
            text += " (per turn)";
        }

        return (
            <>
                <span className="text-neutral-200 text-xs p-1">
                    {emojis.stat}
                </span>
                <span className="text-neutral-100">{text}</span>
                {effect.amountModifier && (
                    <span className="text-neutral-200 text-xs p-1">
                        ({emojis.amountModifier})
                    </span>
                )}
            </>
        );
    };

    return (
        <div className="flex flex-row">
            <p className="text-sm">{renderTargetAction()}</p>
        </div>
    );
}

function ItemBehaviorComponent({ behavior }: { behavior: ItemBehavior }) {
    const [showDetails, setShowDetails] = useState(!behavior.inherited);

    const getBehaviorColor = () => {
        switch (behavior.behaviorType) {
            case "Hold":
                return "green";
            case "Equip":
                return "red";
            case "Use":
                return "yellow";
            default:
                return "default";
        }
    };

    return (
        <div
            className={`relative bg-zinc-700 p-4 m-2 rounded-lg shadow-md hover:bg-neutral-700 transition-all cursor-pointer select-none ${
                showDetails ? "h-[95%]" : "h-12"
            } w-48 whitespace-normal`}
            onClick={() => setShowDetails(!showDetails)}
        >
            <Badge
                color={getBehaviorColor()}
                className="absolute top-0 right-0 -translate-y-1/3 bg-opacity-5 w-12"
            >
                {behavior.behaviorType}
            </Badge>
            <h3
                className={`${
                    behavior.inherited ? "text-neutral-500" : "text-neutral-100"
                } ${showDetails ? "text-lg" : "text-xs"} font-semibold `}
            >
                {behavior.name}
            </h3>
            {showDetails && (
                <div className="text-neutral-200 mt-2">
                    {behavior.costs && (
                        <div className="mt-2">
                            <p className="text-sm mb-1">Costs</p>
                            {behavior.costs?.map((cost, index) => (
                                <p key={index} className="text-sm">
                                    <Badge color="dark">
                                        {cost.amount}{" "}
                                        {STAT_EMOJI[cost.resource]} (
                                        {cost.resource})
                                    </Badge>
                                    {cost.amountModifier &&
                                        ` (${cost.amountModifier})`}
                                </p>
                            ))}
                        </div>
                    )}

                    {behavior.effects && (
                        <div className="mt-4">
                            <p className="text-sm mb-1">Effects</p>
                            {behavior.effects?.map((effect, index) => (
                                <ItemBehaviorEffect
                                    effect={effect}
                                    key={index}
                                />
                            ))}
                        </div>
                    )}

                    {behavior.range && (
                        <div className="mt-4">
                            <p className="text-sm mb-1">Range</p>
                            <Badge color="dark" className="mt-4">
                                {behavior.range.type} ({behavior.range.distance}
                                )
                            </Badge>
                        </div>
                        // <p className="text-sm mt-4">
                        //     Range: {behavior.range.type} (
                        //     {behavior.range.distance})
                        // </p>
                    )}
                </div>
            )}
        </div>
    );
}

function ItemComponent({
    item,
    // combineNamedBehaviors,
}: {
    item: Item;
    combineNamedBehaviors: boolean;
}) {
    const images = (
        ITEM_IMAGES as Record<string, { name: string; url: string }[]>
    )[item.id];

    const behaviors = item.behaviors.sort((a, b) => {
        if (a.inherited && !b.inherited) {
            return 1;
        }
        if (!a.inherited && b.inherited) {
            return -1;
        }
        return 0;
    });

    let mainBehaviors = behaviors.filter((behavior) => !behavior.inherited);
    mainBehaviors = mainBehaviors.sort((a, b) => {
        if (a.behaviorType === "Equip" && b.behaviorType !== "Equip") {
            return 1;
        }
        if (a.behaviorType !== "Equip" && b.behaviorType === "Equip") {
            return -1;
        }
        return 0;
    });

    // if (combineNamedBehaviors) {
    //     mainBehaviors = combineNamedItemBehaviors(behaviors);
    // }

    const inheritedBehaviors = behaviors.filter(
        (behavior) => behavior.inherited
    );

    return (
        <>
            <div className="p-4 m-4 bg-neutral-900 border-solid border border-neutral-500 rounded-md drop-shadow-md max-w-full overflow-hidden">
                <Badge
                    color="default"
                    className="mb-2 bg-opacity-5 absolute right-3 w-16"
                >
                    {item.category}
                </Badge>
                <h1 className="mb-2 text-2xl">{item.name}</h1>
                <p>{item.description}</p>

                <div className="flex flex-row">
                    {images && images.length > 0 && (
                        <div className="mt-4 rounded-md w-40 flex items-center p-2 flex-shrink-0">
                            <img
                                src={images[0].url}
                                alt={images[0].name}
                                className="object-contain"
                            />
                        </div>
                    )}
                    <div className="mt-4 bg-neutral-800 p-2 rounded-md  overflow-x-auto whitespace-nowrap">
                        {/* <h4 className="mb-2 text-md">Behaviors</h4> */}
                        <div className="flex flex-row gap-2">
                            {mainBehaviors.map((behavior, idx) => (
                                <div
                                    className="inline-block break-normal"
                                    key={`${item.id}-behavior-${idx}`}
                                >
                                    {/* Add 'break-normal' here */}
                                    <ItemBehaviorComponent
                                        behavior={behavior}
                                        key={`${item.id}-behavior-${idx}`}
                                    />
                                </div>
                            ))}
                            {inheritedBehaviors.length > 0 && (
                                <div className="flex flex-col">
                                    {inheritedBehaviors.map((behavior, idx) => (
                                        <ItemBehaviorComponent
                                            behavior={behavior}
                                            key={`${item.id}-behavior-${idx}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemComponent;
