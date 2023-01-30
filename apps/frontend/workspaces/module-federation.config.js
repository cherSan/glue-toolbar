module.exports = {
  name: 'frontend-workspaces',
  exposes: {
    './Routes': 'apps/frontend/workspaces/src/app/remote-entry/entry.routes.ts',
  },
};
