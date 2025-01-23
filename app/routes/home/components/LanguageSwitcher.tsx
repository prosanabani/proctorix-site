import { t } from '@lingui/macro';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { type MenuItem } from 'primereact/menuitem';

const LanguageSwitcher = () => {
  const navigate = useNavigate();
  const menuLeft = useRef(null);

  const languages: MenuItem[] = [
    {
      items: [
        {
          command: () => {
            locale.set('en');
            navigate('');
          },
          disabled: locale.value === 'en',
          icon: 'i-icon-park-solid:english',
          label: 'English',
        },
        {
          command: () => {
            locale.set('ar');
            navigate('');
          },
          disabled: locale.value === 'ar',
          icon: 'i-mdi:abjad-arabic',
          label: 'العربية',
        },
        // {
        // command: () => i18n.activate('en'),
        // disabled: i18n.locale === 'en',
        // icon: '',
        // label: t`English`,
        // },
      ],
      label: t`Language`,
    },
  ];

  return (
    <>
      <Button
        aria-controls="lang_popup_menu_left"
        aria-haspopup
        icon="i-tabler:language w-5 h-5"
        onClick={(event) =>
          // @ts-expect-error fix later
          menuLeft.current.toggle(event)
        }
        rounded
      />
      <Menu id="lang_popup_menu_left" model={languages} popup ref={menuLeft} />
    </>
  );
};

export default LanguageSwitcher;
