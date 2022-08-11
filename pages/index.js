import Link from 'next/link'
import { Grid, Card, Text, Code, useTheme } from '@geist-ui/core'
import { useRouter } from 'next/router'

import isLocaleRTL from '../helpers/isLocaleRTL'
import Layout from '../components/Layout'
import { themePreference } from '../state/Theme'

import config from '../main.config'
import i18n from '../i18n'

export default function () {
    const theme = useTheme()
    const { locale = 'en' } = useRouter()

    const page = i18n['root']['index']
    const title = page['title'][locale]
    const description = page['description'][locale]

    return (
        <Layout
            config={config}
            i18n={i18n}
            themePreference={themePreference}
            crownLarge={title}
            crownSmall={description}
            metaTitle={title}
        >
            <Grid.Container gap={1}>
                <Grid xs={24}>
                    <Card
                        width="100%"
                        style={{
                            backgroundColor: theme.palette.accents_1,
                        }}
                    >
                        <Text
                            type="secondary"
                            style={{
                                direction: isLocaleRTL(locale) ? 'rtl' : 'ltr',
                            }}
                        >
                            {page['content'][locale]}
                        </Text>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}
