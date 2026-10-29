import useLabNavigation from './navigation/useLabNavigation.js'
import LabView from './views/LabView.jsx'
import ProjectWorkspaceView from './views/ProjectWorkspaceView.jsx'
import './App.css'

function App() {
  const { isLab, projectSlug, navigateToLab, navigateToProject } =
    useLabNavigation()

  if (isLab) {
    return <LabView onProjectClick={navigateToProject} />
  }

  return (
    <ProjectWorkspaceView
      slug={projectSlug ?? ''}
      onBack={navigateToLab}
    />
  )
}

export default App
