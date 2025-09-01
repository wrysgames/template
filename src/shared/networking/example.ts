import ByteNet from '@rbxts/bytenet';

export = ByteNet.defineNamespace('example', () => ({
	test: ByteNet.definePacket({
		reliabilityType: 'reliable',
		value: ByteNet.struct({
			id: ByteNet.string,
		}),
	}),
}));
