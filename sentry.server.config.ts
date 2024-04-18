/**
 * Configures the initialization of Sentry on the server.
 * The config you add here will be used whenever the server handles a request.
 * For more information, refer to the Sentry documentation: https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  /**
   * The Data Source Name (DSN) is a unique identifier for your Sentry project.
   * It allows Sentry to associate events with your project and send them to the correct project in your Sentry organization.
   * You can find the DSN for your project in the Sentry dashboard.
   */
  dsn: "https://ba7e4c5759fa5ea7d040dbe0cd16397d@o4507106212118528.ingest.us.sentry.io/4507106213560320",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
});
