
import { useSelection, useSelectionActions} from "../core/context/dataContexts";
import { FC } from "react";
import { focusCameraOnNodes } from "../core/sigma";
import { useTranslation } from "react-i18next";

/**
 * Configuration of react-markdown
 * https://www.contentful.com/blog/react-markdown/
 */

const NODE_LINK_PREFIX = 'node=';

export const CustomMarkdownComponent = {
  li: ({ ...props }) => (
    <li style={{ lineHeight: "0.8" }} {...props} />
  ),
  a: ({ ...props }) => {
    if (props.href && props.href.startsWith(NODE_LINK_PREFIX)) {
      const nodeId = props.href.replace(NODE_LINK_PREFIX, '');
      return ( <MarkdownNodeLink title={props.children} node={nodeId}/> )
    }
    else {
      return ( <a target="_blank" { ...props }/> )
    }
  }
};


type NodeLinkProp = {
  title: string,
  node: string,
}

const MarkdownNodeLink: FC<NodeLinkProp> = ({ title, node }) => {
  const { select, emptySelection } = useSelectionActions();
  const { t } = useTranslation();
  const { items } = useSelection();
  return ( 
      <button 
        className="gl-btn gl-btn-icon gl-btn-outline-node-link"
        title={t("selection.tooltip_link_button")}
        onClick={(event) => {
            if (!event.ctrlKey) { 
              emptySelection();
              items.clear();
            }
            select({ type: "nodes", items: new Set([node]) });
            items.add(node);
            focusCameraOnNodes(items);
          }}
      >{title}</button> 
    )
};
