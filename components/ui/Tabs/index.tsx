import { FC, ReactElement, ReactNode, SyntheticEvent } from "react";
import { Box, Tabs as MuiTabs, Tab, TabOwnProps } from "@mui/material";
import { View } from "@/components/layout/View";
// import "./index.scss";

type TabType = {
  value: string;
  label: string;
  id: string;
  icon?: ReactElement;
  iconPosition?: "top" | "bottom" | "start" | "end" | undefined;
};

type TabPanelType = {
  id: string;
  component: ReactNode;
};

type TabConfigType = {
  tabs: Array<TabType>;
  tabPanels: Array<TabPanelType>;
};
type TabsProps = {
  config: TabConfigType;
  value: string;
  onChange: (event: SyntheticEvent, value: any) => void;
};

const Tabs: FC<TabsProps> = ({ config, value, onChange }: TabsProps) => {
  return (
    <View className="flex-container">
      <MuiTabs value={value} onChange={onChange} sx={{ width: '100%', marginBottom: 1, height: 32, minHeight: 32 }}>
        {config &&
          config?.tabs?.map((tab: TabType) => (
            <Tab
              key={tab?.id}
              value={tab?.value}
              label={tab?.label}
              id={tab?.id}
              icon={tab?.icon}
              iconPosition={tab?.iconPosition}
              sx={{
                minHeight: 32,
                height: 32,
                fontSize: 16,
                px: 2,
                // fontWeight: 600,
                textTransform: 'none',
                gap: 1,
                '& svg': { // Target the SVG icon directly
                  marginRight: '4px', // Adjust this value for desired spacing
                },
              }}
            />
          ))}
      </MuiTabs>
      {config &&
        config?.tabPanels?.map((tabPanel: TabPanelType) => (
          <div className="flex-container"
            key={tabPanel?.id}
            role="tabpanel"
            hidden={value !== tabPanel?.id}
            id={`tabpanel-${tabPanel?.id}`}
            aria-labelledby={`tab-${tabPanel?.id}`}
          >
            {value === tabPanel?.id && <View className="flex-container">{tabPanel?.component}</View>}
          </div>
        ))}
    </View>
  );
};

export default Tabs;
