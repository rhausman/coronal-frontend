import React from "react"

const ShirtContext = React.createContext({ contents: { disp_str: "yeet", threat_level: "unknown" }, setResp: () => { } })
export const ShirtProvider = ShirtContext.Provider;
export const ShirtConsumer = ShirtContext.Consumer;
export default ShirtContext