# Kontent.ai multi-web sample application template

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

## Demo

⚒ Karma Manufacturing

[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=karma-manufacturing&style=for-the-badge&logo=false)](https://karma.kontent.dev)

## Getting Started

To run the app yourself you will need a clone of the Kontent.ai project.
As it is currently in early access, please create an issue and mention the email tied with the Kontent.ai account you want to enable the project for.
Once we grant you access, you will be able to create your copy of the source project right from the Kontent.ai UI (`app.kontent.ai/projects`).

### Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/kontent-ai-presales-engineering/kontent-ai-karma-master&project-name=kontent-sample-app&repository-name=kontent-sample-app-next-js&env=KONTENT_COLLECTION_CODENAME,NEXT_PUBLIC_KONTENT_ENVIRONMENT_ID,NEXT_PUBLIC_KONTENT_PREVIEW_API_KEY,NEXT_PUBLIC_OTHER_COLLECTIONS_DOMAINS&envDescription=Required%20to%20connect%20the%20app%20with%20Kontent&envLink=[https://github.com/kontent-ai-presales-engineering/kontent-ai-karma-master#environment-variables](https://github.com/kontent-ai-presales-engineering/kontent-ai-karma-master#environment-variables))


### Preview mode

The app uses the [Next's preview mode](https://nextjs.org/docs/pages/building-your-application/configuring/preview-mode) to display [Kontent.ai preview data](https://kontent.ai/learn/create/content-creation-first-steps/preview-your-content) on the site.

All the features, including [preview urls](https://kontent.ai/learn/docs/preview/preview-configuration/javascript#a-define-preview-urls-for-content-types), [Web Spotlight](https://kontent.ai/learn/docs/preview/preview-configuration/javascript#a-set-up-a-preview-for-web-spotlight) and [multiple previews](https://kontent.ai/learn/docs/preview/preview-configuration/javascript#a-set-up-multiple-previews-with-spaces) are configured automatically when the project is generated. Next.js preview mode is also toggled whenever you view content via Web Spotlight or Preview button.

If you open the app outside of Kontent.ai, it will by default show the published content.
To enable the preview mode, visit the `/api/preview` route and provide the following query parameters:
* `secret` - This prevents unauthorised access to the preview data. Default value is `mySuperSecret`.
* `slug` - This defines where should the app redirect you once the preview mode is enabled (e.g. `/`).
* `type` - This must be the codename of the content type that the item represented by `slug` is based on. It can be either `page` or `web_spotlight_root`.

An example might look something like this: `/api/preview?secret=mySuperSecret&slug=about-us&type=page`.
To exit the preview mode, visit the route `/api/exit-preview`. 
No query parameter is necessary, but you can provide `callback` with a path to redirect to once the preview mode is disabled.

> The preview mode leverages cookies, so when you open the app in preview (e.g. from Kontent.ai) and then open it again (e.g. in a different tab),
> the second instance will remain in preview, as long as the cookies are present. You can clear cookies manually or visit `/api/exit-preview` which removes them as well.


## Code development

### Environment variables

1. Set up environment variables
    * Copy the `.env.local.template` file in this directory to `.env.local` (which will be ignored by Git):

        ```sh
        cp .env.local.template .env.local
        ```
    * Fill in all the necessary variables in `.env.local` based on the comments.

1. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

🎉 Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running the app in web spotlight
If you want to use your app inside [web spotlight](https://kontent.ai/features/webspotlight/), you will need to run the app under the `https` scheme.

To run the app under the `https` scheme you can use one of the following methods:
* Run `npm run https:dev` to run the app in the development mode and a proxy server proxying `https://localhost:3001` to `http://localhost:3000`. 
  * The proxy will use a self-signed certificate which might not work in some browsers.
  * The proxy is run using the [`local-ssl-proxy`](https://www.npmjs.com/package/local-ssl-proxy) package.
  * The command requires the ports 3001 and 3000 to be free, otherwise it fails. If you want to use different ports, you will need to run the proxy (`npm run https:proxy`) and the app `npm run dev` yourself.
* Run `npm run https:proxy` to create a proxy as above without running the app (you are expected to run the app separately).
  * You can use this command with a custom trusted certificate like this `npm run https:proxy -- --key localhost-key.pem --cert localhost.pem`. See [the package documentation](https://github.com/cameronhunter/local-ssl-proxy#run-ssl-proxy-with-a-self-signed-trusted-certificate) for more details
  * You can also change the source and/or target port (e.g. `npm run https:proxy -- --source 3002 --target 4000`)
* [Write your own server](https://github.com/vercel/next.js/tree/canary/examples/custom-server).
* Use [Ngrok](https://ngrok.com/) or a similar tool.

You can adjust the homepage by editing `pages/[envId]/index.tsx`. The page auto-updates as you edit the file.

To generate new models from Kontent.ai data, just run `npm run generateModels`. Make sure you have environment variables filled in properly.

### Use codebase as a starter

> ⚠ This project is not intended as a starter project. It is a sample of a presentation channel showcasing Kontent.ai capabilities. The following hints help you use this code as a base for presentation channel for your project like a boilerplate. By doing it, you are accepting the fact you are changing the purpose of this code.

The app contains code to dynamically handle different Kontent.ai projects (e.g. the environment route prefix). To adjust the code to be used for a single project as a starter, you should remove the logic that is used solely for showcasing the sample project during evaluation.

Below are some of the parts responsible for handling different Kontent.ai projects that need adjustment in case of transforming the code into a single-project setup:

* `middleware.ts` - Gets the Kontent.ai environment ID and stores it in a cookie (named: "currentEnvId"). For single-project setup, a single environment variable should be used to store the environment ID.
* `pages/[envId]` - Folder representing the [dynamic segment](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes), passing the environment ID for pages. For single-project setup, remove the folder and move its content one level up.

### Commands

https://github.com/kontent-ai-presales-engineering/kontent-ai-karma-master/blob/ba5ced56a567ce1bf04744b53c8aa4de112e63b6/package.json#L4-L11

[contributors-shield]: https://img.shields.io/github/contributors/kontent-ai/sample-app-next-js.svg?style=for-the-badge
[contributors-url]: https://github.com/kontent-ai-presales-engineering/kontent-ai-karma-master/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kontent-ai/sample-app-next-js.svg?style=for-the-badge
[forks-url]: https://github.com/kontent-ai-presales-engineering/kontent-ai-karma-master/network/members
[stars-shield]: https://img.shields.io/github/stars/kontent-ai/sample-app-next-js.svg?style=for-the-badge
[stars-url]: https://github.com/kontent-ai-presales-engineering/kontent-ai-karma-master/stargazers
[issues-shield]: https://img.shields.io/github/issues/kontent-ai/sample-app-next-js.svg?style=for-the-badge
[issues-url]:https://github.com/kontent-ai-presales-engineering/kontent-ai-karma-master/issues
[license-shield]: https://img.shields.io/github/license/kontent-ai/sample-app-next-js.svg?style=for-the-badge
[license-url]:https://github.com/kontent-ai-presales-engineering/kontent-ai-karma-master/blob/master/LICENSE.md
[discord-shield]: https://img.shields.io/discord/821885171984891914?color=%237289DA&label=Kontent.ai%20Discord&logo=discord&style=for-the-badge
[discord-url]: https://discord.com/invite/SKCxwPtevJ
