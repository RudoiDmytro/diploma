"use client";

import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { useRouter, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import { Public, ExpandMore } from "@mui/icons-material";
import { Box } from "@mui/material";
import Styles from "./styles";

type Props = {
  children: ReactNode;
  defaultValue: string;
  /** Caller still passes the active locale; the accessible name now comes
   *  from the i18n "change_language" key instead of the raw locale code. */
  label?: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("A11y");

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
      router.refresh();
    });
  }

  return (
    <Box sx={Styles.root}>
      <Box
        component="label"
        htmlFor="locale-switcher"
        sx={[Styles.label, ...(isPending ? [Styles.labelPending] : [])]}
      >
        <Box component="span" sx={Styles.visuallyHidden}>
          {t("change_language")}
        </Box>
        <Box
          component="select"
          id="locale-switcher"
          sx={Styles.select}
          defaultValue={defaultValue}
          disabled={isPending}
          onChange={onSelectChange}
          aria-label={t("change_language")}
        >
          {children}
        </Box>
        <Box component="span" sx={Styles.chevron} aria-hidden>
          <ExpandMore fontSize="small" />
        </Box>
      </Box>
      <Public sx={Styles.globe} aria-hidden />
    </Box>
  );
}
