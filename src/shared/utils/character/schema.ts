export const characterSchema = {
	$className: 'Model',
	Head: 'MeshPart',
	Humanoid: {
		$className: 'Humanoid',
		Animator: 'Animator',
	},
	HumanoidRootPart: 'BasePart',
} as const;
