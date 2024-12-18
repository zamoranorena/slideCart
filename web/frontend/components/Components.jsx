import {
  Card,
  Button,
  Text,
  BlockStack,
  InlineGrid,
  Box,
  Badge,
  InlineStack,
  TextField,
  Popover,
  ColorPicker,
  Frame,
  Collapsible,
  Tooltip,
  Icon,
  SkeletonDisplayText,
  SkeletonBodyText,
  Loading as Load
} from "@shopify/polaris";
import { InfoIcon, ChevronUpIcon ,ChevronDownIcon } from '@shopify/polaris-icons';
import Editor from '@monaco-editor/react';
import { ContextualSaveBar, Loading as LoadParent } from '@shopify/app-bridge-react';
export const ButtonColor = ({ height = '100%', width = '100%', background = '#000000', border = "1px solid #898f94", borderRadius = "0.3rem", id='', click=null}) => {
  return (
    <Button onClick={click} id={id}>
      <div
        style={{
          background: background,
          height: height,
          width: width,
          borderRadius: borderRadius,
          border: border,
        }}
      />
    </Button>
    
  );
};

export function Loading({ active = false }) {
  return (
    active ? <Load /> : <></>
  );
};

export function EditorCode({ value = '', language = 'css', changeState = null }) {
  //console.log('Component EditorCode')
  return (
    <Card padding={0}>
      <Editor
        theme="vs-dark"
        width='100%'
        height='calc(100vh - 200px)'
        fontSize="14px"
        defaultLanguage={language}
        value={value}
        onChange={changeState}
      /* onMount={() => { console.log('onMount') }}
          beforeMount={() => { console.log('beforeMount') }}
          onValidate={() => { console.log('onValidate') }} */
      />
    </Card>
  );
};

export function SaveBar({ equals = true, loading = false, action = null, discard = null }) {
  //console.log('Component SaveBar')
  return (
    !equals ? (
      <ContextualSaveBar
        message="Unsaved changes"
        saveAction={{
          loading: loading,
          onAction: action,
        }}
        discardAction={{
          onAction: discard,
        }}
        visible
        fullWidth={true}
      />
    ) : <div></div>
  );
};

export function Toogle({ children, title = null, description = null, enabled = false, stateText = null, activeToogle = null, action = false }) {
  /* console.log('enabled')
  console.log(enabled)
  console.log('children')
  console.log(children)
  console.log('activeToogle')
  console.log(activeToogle) */
  const cartBarStatusMarkup = (
    <Badge
      tone={enabled ? 'success' : 'critical'}
      toneAndProgressLabelOverride={<label htmlFor="hs-active">
        <Text variant="headingMd" as="h6" tone={enabled ? "success" : 'critical'}>{stateText} {enabled ? 'enabled' : 'disabled'}.</Text>
      </label>}
    >
      {enabled ? "On" : "Off"}
    </Badge>
  );

  const cartBarToogle =
    <InlineStack gap="200" wrap={false}>
      <InlineStack gap="200" align="start" blockAlign="baseline">
        <label htmlFor="hs-active">
          <Text as="p" fontWeight="medium" tone={enabled ? "success" : 'critical'}>{stateText} {enabled ? 'enabled' : 'disabled'}.</Text>
        </label>
        <InlineStack gap="200" align="center" blockAlign="center">
          {cartBarStatusMarkup}
        </InlineStack>
      </InlineStack>
    </InlineStack>;

  const actionMarkup = !action ?  (
    <Button
      role="switch"
      id="hs-active"
      ariaChecked={enabled ? 'false' : 'true'}
      onClick={activeToogle}
      size="slim"
      variant="primary"
      tone={!enabled ? "success" : "critical"}
    >
      {!enabled ? "Turn on" : "Turn off"}
    </Button>
  ) : action;
  const Title = title ? <Text variant="headingSm" as="h5">{title}</Text> : null;
  const Description = description ? <Text>{description}</Text> : null;

  const child = children ? /* <Collapsible
    open={enabled}
    expandOnPrint={true}
    id="basic-collapsible"
    transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
  > */
    <BlockStack gap="500">
      {children}
    </BlockStack>
  /* </Collapsible>  */: null;
  return (
    <BlockStack gap="500">
      <Card roundedAbove="xs">
        <BlockStack gap={{ xs: '200', sm: '300' }}>
          {Title}
          {Description}
          <Box width="100%">
            <BlockStack gap={{ xs: '200', sm: '300' }}>
              <Box width="100%">
                <InlineStack
                  gap="1200"
                  align="space-between"
                  blockAlign="center"
                  wrap={false}
                >
                  {cartBarToogle}
                  <Box minWidth="fit-content">
                    <InlineStack align="end">
                      {actionMarkup}
                    </InlineStack>
                  </Box>
                </InlineStack>
              </Box>
            </BlockStack>
          </Box>
        </BlockStack>
      </Card>
      {child}
    </BlockStack>
  );
};

export function Titles({ text = 'Title' }) {
  return (
    <Text /* variant="headingSm" as="h3" */>{text}</Text>
  );
};

export function ToolInfo({ title = 'Title', description = 'Info', active = false }) {
  return (
    <div style={{ display: "flex" }}>
      <div>{title}</div>
      <Tooltip content={description}><Icon source={InfoIcon} tone="info" /></Tooltip>
    </div>
  );
};

export function FieldColor({
  labelColor = 'Color',
  textValue = '000000',
  colorPicker = {
    "hue": 0,
    "saturation": 0,
    "brightness": 0
  },
  activePop = false,
  activadorPop = null,
  changeColorText = null,
  closePop = null,
  changeColorPicker = null,
}) {
  return (
    <TextField
      label={labelColor}
      value={textValue}
      onChange={changeColorText}
      prefix='#'
      maxLength={6}
      connectedRight={
        <Popover
          active={activePop}
          activator={activadorPop}
          onClose={closePop}
        >
          <Popover.Section>
            <ColorPicker
              onChange={changeColorPicker}
              color={colorPicker}
            />
          </Popover.Section>
          <Popover.Section>
            <TextField
              prefix='#'
              value={textValue}
              maxLength={6}
              onChange={changeColorText} />
          </Popover.Section>
        </Popover>
      }
    />
  );

};

export function Section({children = '', title= '', this_section = null, status_source = true}) {
  return (
    <Card roundedAbove="sm">
      <Box minWidth="fit-content">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {title}
          </Text>
          <Button onClick={this_section} icon={<Icon
            source={status_source ? ChevronUpIcon : ChevronDownIcon}
            color="base" />} variant="plain" ></Button>
        </InlineGrid>
      </Box>
      <Collapsible
        open={status_source}
        id="basic-collapsible"
        transition={{ duration: '300ms', timingFunction: 'ease-in-out' }}
        expandOnPrint
      >
        {children}
      </Collapsible>
    </Card>)
};

export function ToogleSkeleton() {
  return (
    <div>
        <BlockStack gap={500}>
          <SkeletonSimple />
        </BlockStack>
        <Card roundedAbove="xs">
          <Box width="100%">
            <BlockStack gap={{ xs: '500', sm: '600' }}>
              <SkeletonDisplayText lines={1} />
              <SkeletonBodyText lines={1} />
              <SkeletonBodyText lines={1} />
              <SkeletonBodyText lines={1} />
              <SkeletonBodyText lines={1} />
              <SkeletonBodyText lines={1} />
              <SkeletonBodyText lines={1} />
              <SkeletonBodyText lines={1} />
              <SkeletonBodyText lines={1} />
            </BlockStack>
          </Box>
        </Card></div>)
};

export function SkeletonSimple({ children }) {
  return (
    <Box paddingBlockEnd="400">
      <BlockStack gap="500">
        <Card roundedAbove="xs">
          <Box width="100%">
            <BlockStack gap={{ xs: '500', sm: '600' }}>
              <SkeletonDisplayText lines={1} />
              <SkeletonBodyText lines={1} />
              <SkeletonBodyText lines={1} />
            </BlockStack>
          </Box>
        </Card>
        {children}
      </BlockStack>
    </Box>)
};
