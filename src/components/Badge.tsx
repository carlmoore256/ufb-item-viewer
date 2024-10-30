function Badge(props: {
    color: "default" | "red" | "dark" | "green" | "yellow";
    children: React.ReactNode;
    className?: string;
}) {
    const renderColor = () => {
        switch (props.color) {
            case "default":
                return (
                    <span
                        className={`bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ${props.className}`}
                    >
                        {props.children}
                    </span>
                );
            case "red":
                return (
                    <span
                        className={
                            "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 " +
                            props.className
                        }
                    >
                        {props.children}
                    </span>
                );
            case "dark":
                return (
                    <span
                        className={
                            "bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 " +
                            props.className
                        }
                    >
                        {props.children}
                    </span>
                );
            case "green":
                return (
                    <span
                        className={
                            "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 " +
                            props.className
                        }
                    >
                        {props.children}
                    </span>
                );
            case "yellow":
                return (
                    <span
                        className={
                            "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 " +
                            props.className
                        }
                    >
                        {props.children}
                    </span>
                );
            default:
                return (
                    <span
                        className={
                            "bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 " +
                            props.className
                        }
                    >
                        {props.children}
                    </span>
                );
        }
    };

    return <>{renderColor()}</>;
}

export default Badge;
