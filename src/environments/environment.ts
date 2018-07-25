// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://api.openweathermap.org/data/2.5/box/city?bbox=-180,-90,180,90,1&appid=',
  apiToken: '2607c289b781567d549b06cde77ac49e'
};
