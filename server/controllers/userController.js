export const getMe = async (req, res) => {
  if (!req.user) {
    res.json({
      success: true,
      data: {
        user: {
          id: 'local-user',
          name: 'Local User',
          email: 'local@browser',
          provider: 'local',
        },
      },
    });
    return;
  }

  res.json({
    success: true,
    data: {
      user: req.user,
    },
  });
};
