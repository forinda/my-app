import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
declare module 'vue' {
  interface ComponentCustomProperties {
    //  Components: typeof Components
    PrimeForm: typeof import('@primevue/forms')
    PrimeAutoComplete: typeof import('primevue/autocomplete')
    PrimeCascadeSelect: typeof import('primevue/cascadeselect')
    PrimeCheckbox: typeof import('primevue/checkbox')
    PrimeColorPicker: typeof import('primevue/colorpicker')
    PrimeDatePicker: typeof import('primevue/datepicker')
    PrimeFloatLabel: typeof import('primevue/floatlabel')
    PrimeIconField: typeof import('primevue/iconfield')
    PrimeInputGroup: typeof import('primevue/inputgroup')
    PrimeInputMask: typeof import('primevue/inputmask')
    PrimeInputNumber: typeof import('primevue/inputnumber')
    PrimeInputOtp: typeof import('primevue/inputotp')
    PrimeInputText: typeof import('primevue/inputtext')
    PrimeListbox: typeof import('primevue/listbox')
    PrimeMultiSelect: typeof import('primevue/multiselect')
    PrimePassword: typeof import('primevue/password')
    PrimeRadioButton: typeof import('primevue/radiobutton')
    PrimeRating: typeof import('primevue/rating')
    PrimeSelect: typeof import('primevue/select')
    PrimeSelectButton: typeof import('primevue/selectbutton')
    PrimeSlider: typeof import('primevue/slider')
    PrimeTextarea: typeof import('primevue/textarea')
    PrimeToggleButton: typeof import('primevue/togglebutton')
    PrimeToggleSwitch: typeof import('primevue/toggleswitch')
    PrimeTreeSelect: typeof import('primevue/treeselect')
    PrimeButton: typeof import('primevue/button')
    PrimeSpeedDial: typeof import('primevue/speeddial')
    PrimeSplitButton: typeof import('primevue/splitbutton')
    PrimeDataTable: typeof import('primevue/datatable')
    PrimeDataView: typeof import('primevue/dataview')
    PrimeOrderList: typeof import('primevue/orderlist')
    PrimeOrganizationChart: typeof import('primevue/organizationchart')
    PrimePaginator: typeof import('primevue/paginator')
    PrimePickList: typeof import('primevue/picklist')
    PrimeTimeline: typeof import('primevue/timeline')
    PrimeTree: typeof import('primevue/tree')
    PrimeTreeTable: typeof import('primevue/treetable')
    PrimeVirtualScroller: typeof import('primevue/virtualscroller')
    PrimeAccordion: typeof import('primevue/accordion')
    PrimeCard: typeof import('primevue/card')
    PrimeDeferred: typeof import('primevue/deferredcontent')
    PrimeDivider: typeof import('primevue/divider')
    PrimeFieldset: typeof import('primevue/fieldset')
    PrimePanel: typeof import('primevue/panel')
    PrimeScrollPanel: typeof import('primevue/scrollpanel')
    PrimeSplitter: typeof import('primevue/splitter')
    PrimeStepper: typeof import('primevue/stepper')
    PrimeTabs: typeof import('primevue/tabs')
    PrimeToolbar: typeof import('primevue/toolbar')
    PrimeConfirmDialog: typeof import('primevue/confirmdialog')
    PrimeConfirmPopup: typeof import('primevue/confirmpopup')
    PrimeDialog: typeof import('primevue/dialog')
    PrimeDrawer: typeof import('primevue/drawer')
    PrimeDynamicDialog: typeof import('primevue/dynamicdialog')
    PrimePopover: typeof import('primevue/popover')
    PrimeTooltip: typeof import('primevue/tooltip')
    PrimeToast: typeof import('primevue/toast')
  }
}
export function LoadPrimeVue(app: ReturnType<typeof import('vue').createApp>) {
  /**
   * Form Components
   */
  //Form
  app.component('PrimeForm', () => import('@primevue/forms'))
  // AutoComplete
  app.component('PrimeAutoComplete', () => import('primevue/autocomplete'))
  // CascadeSelect
  app.component('PrimeCascadeSelect', () => import('primevue/cascadeselect'))
  // Checkbox
  app.component('PrimeCheckbox', import('primevue/checkbox'))
  //  colorPicker
  app.component('PrimeColorPicker', () => import('primevue/colorpicker'))
  // DatePicker
  app.component('PrimeDatePicker', () => import('primevue/datepicker'))
  // FloatingLabel
  app.component('PrimeFloatLabel', () => import('primevue/floatlabel'))
  //IconField
  app.component('PrimeIconField', () => import('primevue/iconfield'))
  // InputGroup
  app.component('PrimeInputGroup', () => import('primevue/inputgroup'))
  // InputMask
  app.component('PrimeInputMask', () => import('primevue/inputmask'))
  // InputNumber
  app.component('PrimeInputNumber', () => import('primevue/inputnumber'))
  // InputOtp
  app.component('PrimeInputOtp', () => import('primevue/inputotp'))
  // InputText
  app.component('PrimeInputText', () => import('primevue/inputtext'))
  // Listbox
  app.component('PrimeListbox', () => import('primevue/listbox'))
  // MultiSelect
  app.component('PrimeMultiSelect', () => import('primevue/multiselect'))
  // Password
  app.component('PrimePassword', () => import('primevue/password'))
  // RadioButton
  app.component('PrimeRadioButton', () => import('primevue/radiobutton'))
  // Rating
  app.component('PrimeRating', () => import('primevue/rating'))
  // Select
  app.component('PrimeSelect', () => import('primevue/select'))
  // SelectButton
  app.component('PrimeSelectButton', () => import('primevue/selectbutton'))
  // Slider
  app.component('PrimeSlider', () => import('primevue/slider'))
  // Textarea
  app.component('PrimeTextarea', () => import('primevue/textarea'))
  // ToggleButton
  app.component('PrimeToggleButton', () => import('primevue/togglebutton'))
  // ToggleSwitch
  app.component('PrimeToggleSwitch', () => import('primevue/toggleswitch'))
  // TreeSelect
  app.component('PrimeTreeSelect', () => import('primevue/treeselect'))
  /**
   * Button Components
   */
  // Button
  app.component('PrimeButton', () => import('primevue/button'))
  // SpeedDial
  app.component('PrimeSpeedDial', () => import('primevue/speeddial'))
  // SplitButton
  app.component('PrimeSplitButton', () => import('primevue/splitbutton'))
  /**
   * Data Components
   */
  // DataTable
  app.component('PrimeDataTable', () => import('primevue/datatable'))
  // DataView
  app.component('PrimeDataView', () => import('primevue/dataview'))
  //OrderList
  app.component('PrimeOrderList', () => import('primevue/orderlist'))
  // OrganizationChart
  app.component('PrimeOrganizationChart', () => import('primevue/organizationchart'))
  // Paginator
  app.component('PrimePaginator', () => import('primevue/paginator'))
  // PickList
  app.component('PrimePickList', () => import('primevue/picklist'))
  //Timeline
  app.component('PrimeTimeline', () => import('primevue/timeline'))
  // Tree
  app.component('PrimeTree', () => import('primevue/tree'))
  // TreeTable
  app.component('PrimeTreeTable', () => import('primevue/treetable'))
  //VirtualScroller
  app.component('PrimeVirtualScroller', () => import('primevue/virtualscroller'))
  /**
   * Panel Components
   */
  // Accordion
  app.component('PrimeAccordion', () => import('primevue/accordion'))
  // Card
  app.component('PrimeCard', () => import('primevue/card'))
  //Deferred
  app.component('PrimeDeferred', () => import('primevue/deferredcontent'))
  //Divider
  app.component('PrimeDivider', () => import('primevue/divider'))
  // Fieldset
  app.component('PrimeFieldset', () => import('primevue/fieldset'))
  // Panel
  app.component('PrimePanel', () => import('primevue/panel'))
  // ScrollPanel
  app.component('PrimeScrollPanel', () => import('primevue/scrollpanel'))
  //Splitter
  app.component('PrimeSplitter', () => import('primevue/splitter'))
  //Stepper
  app.component('PrimeStepper', () => import('primevue/stepper'))
  //Tabs
  app.component('PrimeTabs', () => import('primevue/tabs'))
  //Toolbar
  app.component('PrimeToolbar', () => import('primevue/toolbar'))
  /**
   * Overlay Components
   */
  // ConfirmDialog
  app.component('PrimeConfirmDialog', () => import('primevue/confirmdialog'))
  // ConfirmPopup
  app.component('PrimeConfirmPopup', () => import('primevue/confirmpopup'))
  // Dialog
  app.component('PrimeDialog', () => import('primevue/dialog'))
  //Drawer
  app.component('PrimeDrawer', () => import('primevue/drawer'))
  //DynamicDialog
  app.component('PrimeDynamicDialog', () => import('primevue/dynamicdialog'))
  //Popover
  app.component('PrimePopover', () => import('primevue/popover'))
  //Tooltip
  app.component('PrimeTooltip', () => import('primevue/tooltip'))
  //Message
  app.component('PrimeMessage', () => import('primevue/message'))
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  app.use(ToastService)
}
