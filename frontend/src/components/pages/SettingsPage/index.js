export default function SettingsPage() {
  return (
    <>
      <h1>SettingsPage Hello World!</h1>
      <ul className="settings-list">
        <li className="settings-list__item">Profile Picture</li>
        <li className="settings-list__item">Starting/Before Picture</li>
        <li className="settings-list__item">Current/After Picture</li>
        <li className="settings-list__item">
          Current Measurements (Weight/Height...)
        </li>
        <li className="settings-list__item">Update Email</li>
        <li className="settings-list__item">Update Password</li>
      </ul>
    </>
  );
}
