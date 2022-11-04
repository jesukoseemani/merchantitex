interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel" hidden={value !== index}
      id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}
      {...other} style={{ marginTop: '2rem' }}
    >
      {value === index && (
        <div>{ children }</div>
      )}
    </div>
  );
}

export default TabPanel;