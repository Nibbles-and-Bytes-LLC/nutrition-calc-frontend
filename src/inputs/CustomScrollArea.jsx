import classNames from "classnames";
import { ScrollArea } from "radix-ui";


const CustomScrollArea = ({ children, rootClassName }) => (
    <ScrollArea.Root className={classNames("ScrollAreaRoot", rootClassName)}>
        <ScrollArea.Viewport className="ScrollAreaViewport ">
            {children}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
            className="ScrollAreaScrollbar"
            orientation="vertical"
        >
            <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
            className="ScrollAreaScrollbar"
            orientation="horizontal"
        >
            <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
);

export default CustomScrollArea;